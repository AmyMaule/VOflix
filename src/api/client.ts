import axios, { AxiosError } from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;
const RETRY_DELAY = 1050;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Retries are necessary in some cases because the backend is set up with a rate limiter
const isRetryableError = (err: unknown): err is AxiosError => {
  if (!axios.isAxiosError(err)) return false;
  if (!err.response) return true;
  const status = err.response.status;

  return (
    status === 429 || (status >= 500 && status < 600)
  );
};

const getRetryDelay = (err: AxiosError): number => {
  const retryAfter = err.response?.headers?.["retry-after"];
  
  if (retryAfter) {
    // Backend sends retry-after in seconds
    const seconds = Number(retryAfter);
    if (!Number.isNaN(seconds)) {
      return seconds * 1000;
    }
  }
  return RETRY_DELAY;
};

const logError = (method: "GET" | "POST", url: string, err: unknown) => {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status ?? "unknown";
    const data = err.response?.data ?? {};
    console.error(`Error: ${method} ${url} failed:`, { status, data });
  } else {
    console.error(`Error: ${method} ${url} failed:`, String(err));
  }
};

export const getData = async <T>(
  url: string,
  retries = 3
): Promise<T> => {
  try {
    const res = await api.get<T>(url);
    return res.data;
  } catch (err: unknown) {
    if (retries > 0 && isRetryableError(err)) {
      const retryDelay = getRetryDelay(err);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return getData<T>(url, retries - 1);
    }
    logError("GET", url, err);
    throw new Error(
      `GET ${url} failed after ${3 - retries} retries: ${err instanceof Error ? err.message : String(err)}`
    );
  }
};

export const postData = async <TResponse = void, TBody = unknown>(
  url: string,
  body?: TBody
): Promise<TResponse> => {
  try {
    const res = await api.post<TResponse>(url, body);
    return res.data;
  } catch (err: unknown) {
    logError("POST", url, err);
    throw new Error(axios.isAxiosError(err)
      ? `Request failed with status ${err.response?.status ?? "unknown"}`
      : `Unknown error during request: ${String(err)}`
    );
  }
};
