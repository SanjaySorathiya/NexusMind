import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "nexusmind",
  baseUrl: process.env.INNGEST_BASE_URL,
});

export type SourceCreatedEvent = {
  name: "source/created";
  data: {
    sourceId: string;
    workspaceId: string;
  };
};

export type ConversationSummarizeEvent = {
  name: "conversation/summarize";
  data: {
    conversationId: string;
    userId: string;
  };
};

export type InngestEvent = SourceCreatedEvent | ConversationSummarizeEvent;
