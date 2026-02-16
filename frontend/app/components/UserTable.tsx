"use client";

import { IUser } from "../types/user";
import { userFormFields } from "../config/formConfig";
import Spinner from "./Spinner";

interface Props {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (id?: string) => void;
  loading: boolean;
}

export default function UserTable({ users, onEdit, onDelete, loading }: Props) {
  if (loading) return <Spinner />;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            {userFormFields.map(field => (
              <th key={field.name} className="p-3">
                {field.label}
              </th>
            ))}
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t hover:bg-gray-50">
              {userFormFields.map(field => (
                <td key={field.name} className="p-3">
                  {user[field.name]}
                </td>
              ))}

              <td className="p-3 space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(user._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={userFormFields.length + 1}
                className="text-center p-4 text-gray-500"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
