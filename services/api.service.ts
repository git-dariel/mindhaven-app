import Constants from "expo-constants";
import { ResponseType, RequestOptions, ApiError } from "@/types/api.types";

// Get base URL from environment
const getBaseUrl = (): string => {
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;
  if (!apiUrl) {
    throw new Error("API URL not configured");
  }
  return apiUrl;
};

// Format error to consistent type
const formatError = (error: unknown): Error => {
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);
  return new Error("An unknown error occurred");
};

// Handle API response
const handleResponse = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    const error: ApiError = {
      message: "Request failed",
      status: response.status,
    };

    try {
      const data = await response.json();
      error.message = data.error || error.message;
    } catch {
      error.message = response.statusText;
    }

    throw error;
  }
  return response;
};

// Process response based on type
const processResponse = async (response: Response, responseType?: ResponseType): Promise<any> => {
  return responseType === "arraybuffer" ? await response.arrayBuffer() : await response.json();
};

// Create request headers
const createHeaders = (options: RequestOptions = {}): HeadersInit => ({
  "Content-Type": "application/json",
  ...options.headers,
});

// Make GET request
const get = async (endpoint: string, options: RequestOptions = {}) => {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: createHeaders(options),
    });

    await handleResponse(response);
    return processResponse(response, options.responseType);
  } catch (error) {
    console.error("GET request failed:", error);
    throw formatError(error);
  }
};

// Make POST request
const post = async (endpoint: string, data: unknown, options: RequestOptions = {}) => {
  try {
    const baseUrl = getBaseUrl();
    console.log("Making POST request to:", `${baseUrl}${endpoint}`, data);

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: createHeaders(options),
      body: JSON.stringify(data),
    });

    await handleResponse(response);
    return processResponse(response, options.responseType);
  } catch (error) {
    console.error("POST request failed:", error);
    throw formatError(error);
  }
};

export const apiService = {
  get,
  post,
};
