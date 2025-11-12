// utils/getUser.ts
export interface User {
  isLoggedIn: boolean;
  role: "admin" | "user";
  name: string;
  memberSince: string;
  email?: string;
}

export const getUser = (): User => {
  // Example: get user email from localStorage, API, or cookies
  const email = localStorage.getItem("userEmail") || "guest@example.com";

  // Extract first name from email
  const firstName = email.split("@")[0].split(/[.\-_]/)[0]; // handles "sarah.johnson", "john_doe", etc.
  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  return {
    isLoggedIn: true,
    role: "admin",
    name: capitalizedFirstName,
    memberSince: "2022",
    email,
  };
};
