import { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router";
import { api } from "../services/axios";
import { AuthContext } from "../context/AuthContext";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { user: currentUser } = useContext(AuthContext);

  if (currentUser) <Navigate to="/" />;

  const handleLoginFormInput = (event) => {
    const { name, value } = event.target;

    setUser((previous) => ({ ...previous, [name]: value }));
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", user);
      console.log("Response: ", response.data);

      if (response?.data?.isSuccess) <Navigate to="/" />;

      setUser({
        email: "",
        password: "",
      });
      setError("");
    } catch (error) {
      console.log("Error: ", error.message);
      console.log(error.response?.data);
      setError(error?.response?.data?.message);
    }
    console.log(user);
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center mt-24">
      <form
        onSubmit={handleLoginFormSubmit}
        className="shadow-2xl p-5 rounded-2xl min-h-70 w-100"
      >
        <h1 className="text-3xl font-semibold mb-6">Login Form</h1>

        <div className="flex flex-col  mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="off"
            className="border px-0.5 py-1 rounded-md"
            value={user.email}
            onChange={handleLoginFormInput}
          />
        </div>

        <div className="flex flex-col mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="off"
            className="border px-0.5 py-1 rounded-md"
            value={user.password}
            onChange={handleLoginFormInput}
          />
        </div>
        <p>
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-800 font-semibold">
            Register
          </NavLink>
        </p>

        {error && (
          <p className="bg-red-300 text-red-700 p-1 font-medium mt-1">
            Invalid email or password
          </p>
        )}

        <input
          type="submit"
          value="Login"
          className="mt-5 w-full rounded-md py-1 bg-blue-600 text-white cursor-pointer"
        />
      </form>
    </div>
  );
}
