import Constants from "expo-constants";

interface RequestOptions {
  responseType?: "json" | "arraybuffer";
  headers?: Record<string, string>;
}

interface ApiError {
  message: string;
  status?: number;
}

export class ApiService {
  protected baseUrl: string;

  constructor() {
    const apiUrl = Constants.expoConfig?.extra?.apiUrl;
    if (!apiUrl) {
      throw new Error("API URL not configured");
    }
    this.baseUrl = apiUrl;
  }

  protected async handleResponse(response: Response) {
    if (!response.ok) {
      const error: ApiError = {
        message: "Request failed",
        status: response.status,
      };

      try {
        const data = await response.json();
        error.message = data.error || error.message;
      } catch {
        // If response is not JSON, use status text
        error.message = response.statusText;
      }

      throw error;
    }
    return response;
  }

  protected async get(endpoint: string, options: RequestOptions = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return options.responseType === "arraybuffer"
        ? await response.arrayBuffer()
        : await response.json();
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  }

  protected async post(endpoint: string, data: any, options: RequestOptions = {}) {
    try {
      console.log("Making POST request to:", `${this.baseUrl}${endpoint}`, data);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return options.responseType === "arraybuffer"
        ? await response.arrayBuffer()
        : await response.json();
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  }

  private formatError(error: any): Error {
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "string") {
      return new Error(error);
    }
    return new Error("An unknown error occurred");
  }
}
