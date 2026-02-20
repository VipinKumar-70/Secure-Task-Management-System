BASE_URL = "http://localhost:3000";

export const registerUser = async () => {
  const res = await fetch(`${BASE_URL}/api/register`);
};
