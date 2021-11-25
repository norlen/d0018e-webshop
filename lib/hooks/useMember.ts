import { useState } from "react";

// hook som körs i bakgrunden, skickar data(namn,email,password) till serverns API funktion getMember.
// Två fall, 1 mail exist: hantera den datan skicka err?
// 2. Mail gets added: hantera member created -> göra vad med datan?.

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
  //Hur fungerar denna returnen? memberData kanske inte ens har kommit tillbaka från servern,
  // kan då loading och error ändå returnera???
  return { loading, error, memberData };
};

export default useMember;
