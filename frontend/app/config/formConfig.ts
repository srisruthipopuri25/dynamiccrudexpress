import { IUser } from "../types/user";

export type FieldConfig = {
  name: keyof IUser;
  label: string;
  type: string;
  required?: boolean;
  pattern?: RegExp;
};

export const userFormFields: FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    required: true,
    pattern: /^[0-9]{10}$/
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    pattern: /^\S+@\S+\.\S+$/
  }
];
