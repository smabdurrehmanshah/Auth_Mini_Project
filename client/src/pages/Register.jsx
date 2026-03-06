import { useState } from "react";
import { Navigate, NavLink } from "react-router";
import { api } from "../services/axios";

export function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profileImage: null,
  });
  const [error, setError] = useState("");
  const { user: currentUser } = useContext(AuthProvider);

  if (currentUser) <Navigate to="/" />;

  const handleRegistrationFormInput = (event) => {
    const { name, value } = event.target;

    setUser((previous) => ({ ...previous, [name]: value }));
  };

  const handleRegistrationFormSubmit = async (event) => {
    event.preventDefault();
    console.log(user);

    try {
      const formData = new FormData();

      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("profileImage", user.profileImage);

      await api.post("/auth/register", formData);

      <Navigate to="/login" />;

      setUser({
        username: "",
        email: "",
        password: "",
        profileImage: "",
      });
      setError("");
    } catch (error) {
      console.log("Error: ", error.message);
      console.log(error.response);

      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <form
        onSubmit={handleRegistrationFormSubmit}
        className="shadow-2xl p-5 rounded-2xl min-h-80 w-100"
      >
        <h1 className="text-3xl font-semibold mb-5">Registration Form</h1>
        <div className="flex flex-col gap-1 mt-2.5">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            autoComplete="off"
            className="border border-gray-600 px-0.5 py-1 rounded-md"
            value={user.username}
            onChange={handleRegistrationFormInput}
          />
        </div>

        <div className="flex flex-col gap-1  mt-2.5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            autoComplete="off"
            className="border border-gray-600 px-0.5 py-1 rounded-md"
            value={user.email}
            onChange={handleRegistrationFormInput}
          />
        </div>

        <div className="flex flex-col gap-1 mt-2.5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="off"
            className="border border-gray-600 px-0.5 py-1 rounded-md"
            value={user.password}
            onChange={handleRegistrationFormInput}
          />
        </div>

        <div className="flex flex-col gap-1 mt-2.5">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={(e) =>
              setUser({ ...user, profileImage: e.target.files[0] })
            }
            className="border border-gray-600 px-0.5 py-1 rounded-md"
          />
        </div>
        <p>
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-800 font-semibold">
            Login
          </NavLink>
        </p>

        {error && (
          <p className="bg-red-300 text-red-700 p-1 font-medium mt-1">
            {error}
          </p>
        )}

        <input
          type="submit"
          value="Register"
          className="mt-5 w-full rounded-md border-0 py-1 bg-blue-600 text-white cursor-pointer"
        />
      </form>
    </div>
  );
}
