import { API_CONFIG } from "../constants/config";

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Request options type
interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  timeout?: number;
}

// API Response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

/**
 * Core API client for making HTTP requests
 * Handles authentication, error handling, and response parsing
 */
class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string = API_CONFIG.baseUrl, timeout: number = API_CONFIG.timeout) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { body, timeout = this.defaultTimeout, ...fetchOptions } = options;

    const url = `${this.baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        credentials: "include", // Include cookies for session auth
      });

      clearTimeout(timeoutId);

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        throw new ApiError(
          response.status,
          data?.message || `Request failed with status ${response.status}`,
          data
        );
      }

      return {
        data: data as T,
        status: response.status,
        ok: true,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiError(408, "Request timeout");
        }
        throw new ApiError(0, error.message);
      }

      throw new ApiError(0, "Unknown error occurred");
    }
  }

  // HTTP method shortcuts
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(endpoint, { ...options, method: "GET" });
    return response.data;
  }

  async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(endpoint, { ...options, method: "POST", body });
    return response.data;
  }

  async put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(endpoint, { ...options, method: "PUT", body });
    return response.data;
  }

  async patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(endpoint, { ...options, method: "PATCH", body });
    return response.data;
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await this.request<T>(endpoint, { ...options, method: "DELETE" });
    return response.data;
  }
}

// Singleton instance
export const apiClient = new ApiClient();

// Export class for testing or custom instances
export { ApiClient };
