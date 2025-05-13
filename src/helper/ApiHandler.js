import { toast } from "react-toastify";
import axios from "axios";
import { apiBasePath } from "./basePath";

export const ApiHandler = async (
  url,
  method,
  body
) => {
  const api = apiBasePath + url;

  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Axios API request
    const response = await axios({
      url: api,
      method: method,
      headers: headers,
      data: body !== undefined && body !== null ? body : undefined,
    });

    const result = response.data;

    if (
      response.status === 401 ||
      response.status === 400 ||
      result.status === "401" ||
      result.status === "400" ||
      result.status === 400 ||
      result.status === 401
    ) {
      toast.error(result.msg || "Unauthorized. Please log in again.");
    } else if (
      response.status === 404 ||
      result.status === 404 ||
      result.status === "404"
    ) {
      toast.error(result.msg || "Not found. Please try again.");
      throw new Error(result.msg);
    } else if (
      response.status === 500 ||
      result.status === 500 ||
      result.status === "500"
    ) {
      toast.error("Something went wrong. Please try again.");
    }

    return response;
  } catch (error) {
    const result = error.response?.data;
    const errorMessage = result?.msg || "An unexpected error occurred.";

    if (
      error.response?.status === 401 ||
      error.response?.status === 400 ||
      result?.status === "401" ||
      result?.status === "400" ||
      result?.status === 400 ||
      result?.status === 401
    ) {
      toast.error(result?.msg || "Unauthorized. Please log in again.");
    } else if (
      error.response?.status === 404 ||
      result?.status === 404 ||
      result?.status === "404"
    ) {
      toast.error(result?.msg || "Not found. Please try again.");
      throw new Error(result?.msg);
    } else if (
      error.response?.status === 500 ||
      result?.status === 500 ||
      result?.status === "500"
    ) {
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.error(errorMessage);
      console.error("API Error:", error);
    }
  }
};
