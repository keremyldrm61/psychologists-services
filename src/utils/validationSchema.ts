import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().min(6, "Too short").required("Password is required"),
  })
  .required();

export const registrationSchema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-zA-Z]/, "Password must contain latin letters")
      .matches(/[0-9]/, "Password must contain numbers")
      .required("Password is required"),
  })
  .required();

export const appointmentSchema = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least characters"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\+380\d{9}$/, "Phone number must match format +380xxxxxxxxx"),
    time: yup.string().required("Please select a time"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    comment: yup.string().required("Comment is required"),
  })
  .required();

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export type AppointmentFormData = yup.InferType<typeof appointmentSchema>;
