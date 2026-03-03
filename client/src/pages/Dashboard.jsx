import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { api } from "../services/axios";
import { useState } from "react";

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log(response.data);

        if (response?.data?.isSuccess) setUsers(response?.data?.users);
      } catch (error) {
        setUsers(null);
        console.log(error?.response);
      }
    };

    getAllUsers();
  }, []);

  if (users) console.log(users);

  return (
    <>
      <header className="shadow p-3">
        <nav>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <img
                src={user.profileImage}
                alt="Avatar"
                className="w-8 h-8 rounded-full overflow-hidden bg-cover"
              />
              <p className="font-medium">{user.username}</p>
            </div>
            <button className="bg-red-500 px-2 py-1 rounded-sm text-white cursor-pointer">
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main>
        <div className="flex gap-4 mt-4">
          {users &&
            users.map((user) => {
              return (
                <div className="shadow px-4 py-2 flex items-center gap-4 rounded-md">
                  <img
                    src={user.profileImage}
                    alt="Avatar"
                    className="h-20 rounded-md bg-cover"
                  />
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}
