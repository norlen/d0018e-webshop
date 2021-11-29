import { useState } from "react";
import { mapError } from "@lib/errorCodes";

type UseCallAPIResp<T, U> = {
  loading: boolean;
  error?: string;
  call: (data: T) => Promise<U>;
};

export const useCallAPI = <T, U>(url: string): UseCallAPIResp<T, U> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const call = async (data: any) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const json = await response.json();
      setLoading(false);

      if (!response.ok) {
        console.log("Got error from API", json);
        setError(mapError(json.code, json.message));
      }

      return json.data;
    } catch (err) {
      setLoading(false);
      console.error("fetch error", err);
      setError((err as Error).message);
    }
  };

  return { loading, error, call };
};
