import { serve } from "inngest/next";
import { inngest } from "@/src/features/inngest/client";
import { processTask } from "@/src/features/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask],
});
