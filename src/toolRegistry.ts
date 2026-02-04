import type { ThreadsManager } from "./manager.js";
import { toolDescriptions, toolSchemas, type ToolName } from "./toolSchemas.js";
import { buildToolDefinitions, parseToolArgs, type ToolDefinition, type ToolHandler, type ToolRegistry } from "@meta-mcp/core";

export type { ToolDefinition, ToolHandler, ToolRegistry };

export const createToolRegistry = (manager: ThreadsManager): ToolRegistry<ToolName> => {
  const handlers: Record<ToolName, ToolHandler> = {
    th_post_thread: async (args) => {
      const parsed = parseToolArgs(toolSchemas.th_post_thread, args);
      return manager.postThread(parsed.text, parsed.media_type, parsed.media_url, {
        reply_control: parsed.reply_control,
        quote_post_id: parsed.quote_post_id,
        link_attachment: parsed.link_attachment,
        alt_text: parsed.alt_text,
      });
    },
    th_get_user_threads: async (args) => {
      const parsed = parseToolArgs(toolSchemas.th_get_user_threads, args);
      return manager.getUserThreads(parsed.limit);
    },
    th_get_user_insights: async () => manager.getUserInsights(),
    th_get_publishing_limit: async () => manager.getPublishingLimit(),
  };

  const definitions = buildToolDefinitions(toolSchemas, toolDescriptions) as ToolDefinition<ToolName>[];

  return { definitions, handlers };
};

export type ThreadsToolRegistry = ToolRegistry<ToolName>;
