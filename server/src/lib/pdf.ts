import { extractText, getDocumentProxy } from "unpdf";
import {
  getPrivateCloudinaryDownloadUrl,
  getSignedCloudinaryDownloadUrl,
} from "./cloudinary.js";

export type PdfExtractResult = {
  text: string;
  pages: string[];
  pageCount: number;
};

export class ScannedPdfError extends Error {
  constructor() {
    super("Scanned PDF not supported, please try with Normal text PDF");
    this.name = "ScannedPdfError";
  }
}

async function downloadPdf(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download PDF (${response.status})`);
  }

  return response.arrayBuffer();
}

export async function extractPdfFromBuffer(
  buffer: ArrayBuffer | Buffer,
): Promise<PdfExtractResult> {
  const arrayBuffer =
    buffer instanceof Buffer
      ? (buffer.buffer.slice(
          buffer.byteOffset,
          buffer.byteOffset + buffer.byteLength,
        ) as ArrayBuffer)
      : buffer;

  const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
  const { totalPages, text } = await extractText(pdf, { mergePages: false });

  const pages = Array.isArray(text)
    ? text.map((page) => page.trim())
    : [String(text).trim()];

  const joined = pages.filter(Boolean).join("\n\n");

  if (!joined) {
    throw new ScannedPdfError();
  }

  return {
    text: joined,
    pages,
    pageCount: totalPages,
  };
}

export async function extractPdfFromCloudinary(input: {
  fileUrl: string;
  publicId?: string;
  resourceType?: "raw" | "image";
}): Promise<PdfExtractResult> {
  try {
    const buffer = await downloadPdf(input.fileUrl);
    return await extractPdfFromBuffer(buffer);
  } catch (error) {
    const isUnauthorized =
      error instanceof Error && error.message.includes("(401)");

    if (!isUnauthorized || !input.publicId) {
      throw error;
    }

    const resourceType = input.resourceType ?? "raw";
    const signedUrl = getSignedCloudinaryDownloadUrl(
      input.publicId,
      resourceType,
    );

    if (!signedUrl) {
      throw new Error(
        "PDF download requires authentication. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to server/.env, or re-upload the PDF.",
      );
    }

    try {
      return await extractPdfFromBuffer(await downloadPdf(signedUrl));
    } catch (signedError) {
      // Signed CDN URLs are still blocked when PDF delivery is disabled on the
      // account. The Admin API download endpoint is not affected.
      const privateUrl = getPrivateCloudinaryDownloadUrl(
        input.publicId,
        resourceType,
      );
      if (!privateUrl) throw signedError;
      return extractPdfFromBuffer(await downloadPdf(privateUrl));
    }
  }
}
