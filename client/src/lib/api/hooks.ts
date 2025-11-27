import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { apiClient, ApiError } from "./client";

/**
 * Generic hook for GET requests with React Query
 *
 * @example
 * const { data, isLoading } = useApiQuery<Prompt[]>("/prompts", ["prompts"]);
 */
export function useApiQuery<T>(
  endpoint: string,
  queryKey: unknown[],
  options?: Omit<UseQueryOptions<T, ApiError>, "queryKey" | "queryFn">
) {
  return useQuery<T, ApiError>({
    queryKey,
    queryFn: () => apiClient.get<T>(endpoint),
    ...options,
  });
}

/**
 * Generic hook for POST requests with React Query
 * Automatically invalidates related queries on success
 *
 * @example
 * const mutation = useApiMutation<Prompt, CreatePromptData>("/prompts", ["prompts"]);
 * mutation.mutate({ title: "New Prompt", prompt: "..." });
 */
export function useApiMutation<TData, TVariables>(
  endpoint: string,
  invalidateKeys?: unknown[][],
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: (variables) => apiClient.post<TData>(endpoint, variables),
    onSuccess: (data, variables, context) => {
      // Invalidate related queries
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

/**
 * Generic hook for PUT requests
 */
export function useApiUpdate<TData, TVariables>(
  endpoint: string | ((variables: TVariables) => string),
  invalidateKeys?: unknown[][],
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: (variables) => {
      const url = typeof endpoint === "function" ? endpoint(variables) : endpoint;
      return apiClient.put<TData>(url, variables);
    },
    onSuccess: (data, variables, context) => {
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

/**
 * Generic hook for DELETE requests
 */
export function useApiDelete<TData, TVariables = void>(
  endpoint: string | ((variables: TVariables) => string),
  invalidateKeys?: unknown[][],
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationFn: (variables) => {
      const url = typeof endpoint === "function" ? endpoint(variables) : endpoint;
      return apiClient.delete<TData>(url);
    },
    onSuccess: (data, variables, context) => {
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

// Query key factories for consistent cache keys
export const queryKeys = {
  // Auth
  auth: {
    user: () => ["auth", "user"],
    session: () => ["auth", "session"],
  },

  // Prompts
  prompts: {
    all: () => ["prompts"],
    list: (filters?: Record<string, unknown>) => ["prompts", "list", filters],
    detail: (id: number) => ["prompts", "detail", id],
    byCategory: (category: string) => ["prompts", "category", category],
  },

  // Feed
  feed: {
    all: () => ["feed"],
    posts: (page?: number) => ["feed", "posts", page],
    post: (id: number) => ["feed", "post", id],
    comments: (postId: number) => ["feed", "comments", postId],
  },

  // User
  user: {
    profile: (id?: string) => ["user", "profile", id],
    settings: () => ["user", "settings"],
  },

  // Marketplace
  marketplace: {
    items: (filters?: Record<string, unknown>) => ["marketplace", "items", filters],
    item: (id: number) => ["marketplace", "item", id],
  },
};
