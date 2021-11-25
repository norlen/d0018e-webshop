import { useState } from "react";

export const useMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const memberData = async (name: string, email: string, password: string) => {
    setError(undefined);

    const url = "/api/create_member";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message);
      }
      return data;
    } catch (err) {
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };

  return { loading, error, memberData };
};

export default useMember;
