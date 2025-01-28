export const fakeAuthAPI = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password123") {
          resolve({
            success: true,
            token: "fake-jwt-token",
          });
        } else {
          reject({
            success: false,
            message: "Invalid email or password",
          });
        }
      }, 1000); // Імітація затримки сервера
    });
  };


export const testAuthApi = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token; // If token exists, consider the user authenticated
};
