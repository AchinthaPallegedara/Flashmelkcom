// src/lib/api.ts
import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export const bookingService = {
  async getBookings(date: string) {
    try {
      const { data } = await api.get(`/bookings?date=${date}`);
      return data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  async createBooking(bookingData: {
    date: string;
    startTime: string;
    endTime: string;
    packageType: string;
  }) {
    try {
      const { data } = await api.post("/bookings", bookingData);
      return data;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },
};
