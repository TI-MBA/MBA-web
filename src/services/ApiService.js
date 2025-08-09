// services/apiService.js
import api from "./api";

export const authService = {
  /**
   * Authenticate a user and retrieve a login token.
   */
  login(email, password) {
    return api.post("/user/signin", { email, password });
  },

  /**
   * Change the user's password when logged in.
   */
  editPassword(email, currentPassword, newPassword) {
    return api.put("/user/changePassword", {
      email,
      password: currentPassword,
      newPassword,
    });
  },

  /**
   * Reset the user's password (forgot-password flow).
   */
  resetPassword(email) {
    return api.put("/user/resetPassword", { email, password: "" });
  },
};

export const paymentService = {
  /**
   * Retrieve all payments for a specific user.
   */
  getPaymentsBy(userId) {
    return api.get(`/payment/user/${userId}`);
  },
};

export const presenceService = {
  /**
   * Retrieve all presences for a specific user.
   */
  getPresencesBy(userId) {
    return api.get(`/presence/user/${userId}`);
  },
};

export const userService = {
  /**
   * Retrieve detailed information for a specific user.
   */
  getUserData(userId) {
    return api.get(`/user/${userId}`);
  },
};

export const rehearsalService = {
  /**
   * Retrieve rehearsal presence count for a given date range and percentage filter.
   */
  getRehearsalInfo(startDate, endDate, percentageValue) {
    return api.get("/rehearsal-info/rehearsal-presence-count", {
      params: {
        initialDate: startDate,
        finalDate: endDate,
        percentage: percentageValue,
      },
    });
  },
};
