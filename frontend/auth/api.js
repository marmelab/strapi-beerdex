export const login = async (identifier, password) => {
  const response = await fetch(`${process.env.API_BASEURL}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });

  if (response.status !== 200) {
    throw new Error();
  }

  return response.json();
};
