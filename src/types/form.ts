export type Forms = {
  error?: {
    message: "Bad request";
    exception: "Task has no form defined";
  };
  id: string;
  name: string;
  description: string | null;
  key: string;
  version: 4;
  fields: Array<{
    [key: string]: unknown;
  }>;
};
