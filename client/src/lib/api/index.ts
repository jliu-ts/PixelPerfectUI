// API layer - centralized exports

export { apiClient, ApiClient, ApiError } from "./client";
export {
  useApiQuery,
  useApiMutation,
  useApiUpdate,
  useApiDelete,
  queryKeys,
} from "./hooks";
