import { useState } from "react";
import { useMember, useUser } from "@lib/hooks";

const RegisterPage = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const { loading, error, memberData } = useMember();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await memberData(name, email, password);
    if (result) {
      mutateUser(result);
    }
  };
  return (
    <section className="bg-blueGray-50">
      <div className="w-full lg:w-6/12 px-4 mx-auto pt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-3xl text-center mb-6 font-bold">
              <h4>Registrera användare</h4>
            </div>
            <form onSubmit={onSubmit}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  {" "}
                  Namn
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Namn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Lösenord
                </label>
                <input
                  type="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span className="ml-2 text-sm font-semibold text-blueGray-600">
                    Jag instämmer med
                    <a href="javascript:void(0)" className="text-green-500">
                      &nbsp;Integritetspolicyn
                    </a>
                  </span>
                </label>
              </div>
              <button
                className={`w-full text-center bg-green-500 hover:bg-green-700 rounded-lg text-white py-2 px-4 font-medium ${
                  loading ? "disable opacity-50" : ""
                }`}
              >
                {loading
                  ? "Skapar användare ett ögonblick..."
                  : "SKAPA ANVÄNDARE"}
              </button>
              {error && (
                <span className="bg-red-200 rounded-md text-center py-1 text-sm border-red-500 border">
                  {error}
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
