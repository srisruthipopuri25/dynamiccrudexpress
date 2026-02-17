'use client';

import { useState, useEffect } from 'react';
import { IUser } from '../types/user';
import { userFormFields } from '../config/formConfig';
import Spinner from './Spinner';

interface Props {
  onSubmit: (data: IUser) => Promise<void>;
  selectedUser: IUser | null;
  setSelectedUser: (user: IUser | null) => void;
  loading: boolean;
}

export default function UserForm({
  onSubmit,
  selectedUser,
  setSelectedUser,
  loading,
}: Props) {
  const emptyForm: IUser = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  };

  const [formData, setFormData] = useState<IUser>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    }
  }, [selectedUser]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    userFormFields.forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value)
        newErrors[field.name] = `${field.label} is required`;

      if (field.pattern && value && !field.pattern.test(value))
        newErrors[field.name] = `Invalid ${field.label}`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(formData);
    setFormData(emptyForm);
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setSelectedUser(null);
    setErrors({});
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-6 text-center">
        {selectedUser ? 'Update User' : 'Add User'}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {userFormFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              {field.label}
            </label>

            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              disabled={loading}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />

            {errors[field.name] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[field.name]}
              </span>
            )}
          </div>
        ))}

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Spinner />
                Processing...
              </>
            ) : selectedUser ? (
              'Update User'
            ) : (
              'Add User'
            )}
          </button>

          {selectedUser && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-70"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
