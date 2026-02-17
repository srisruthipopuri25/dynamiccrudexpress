"use client";

import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { IUser } from "./types/user";

const API = "http://localhost:5000/api/users";
//const API = "https://dynamicrudexpressbackend.vercel.app/api/users"
// frontend
// https://dynamicrudexpressfrontend.vercel.app/

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (data: IUser) => {
    try {
      setFormLoading(true);

      if (selectedUser?._id) {
        await fetch(`${API}/${selectedUser._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      }

      setSelectedUser(null);
      await fetchUsers();
    } catch {
      setError("Operation failed");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          MERN User CRUD App
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-center">
            {error}
          </div>
        )}

        <UserForm
          onSubmit={handleSubmit}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          loading={formLoading}
        />

        <UserTable
          users={users}
          onEdit={setSelectedUser}
          onDelete={handleDelete}
          loading={loading}
        />

      </div>
    </main>
  );
}
