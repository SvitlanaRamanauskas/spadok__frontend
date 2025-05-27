export const loginUser = async (credentials: { email: string, password: string }) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      if(data.message === "User not found" || data.message === "Invalid credentials") {
        throw new Error("User not registered. Please check your credentials or sign up.");
      }
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};


export const testAuthApi = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
};
