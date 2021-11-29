import { useState } from "react";
import { useSignup, useUser } from "@lib/hooks";

const RegisterPage = () => {
  // Redirect if already signed in.
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const { loading, error, signup } = useSignup();

  // Form inputs.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = name.length > 5 && email.length > 5 && password.length > 5;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!canSubmit) return;

    const user = await signup({ name, email, password });
    if (user) {
      mutateUser(user);
    }
  };

  return (
    <main className="px-12 py-4 lg:py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-4 rounded p-6 w-96 md:shadow-lg bg-white">
          <div>
            <h1 className="text-3xl font-bold">Registrera användare</h1>
            <p className="text-sm text-gray-500">för att kunna lägga ordrar</p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="relative w-full mb-3">
              <input
                type="text"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none autofocus"
                placeholder="Namn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <input
                type="email"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative w-full mb-3">
              <input
                type="password"
                className="input w-full rounded-lg px-4 py-2 border border-gray-500 focus:outline-none focus:border-green-500 active:outline-none"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className={`w-full text-center bg-green-500 hover:bg-green-700 rounded-lg text-white py-2 px-4 font-medium ${
                loading || !canSubmit
                  ? "disable opacity-50 hover:bg-green-500"
                  : ""
              } ${!canSubmit && "cursor-not-allowed"}`}
              disabled={loading || !canSubmit}
            >
              {loading ? "Skapar användare..." : "Skapa användare"}
            </button>
            {error && (
              <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border mt-2 w-full">
                {error}
              </span>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
