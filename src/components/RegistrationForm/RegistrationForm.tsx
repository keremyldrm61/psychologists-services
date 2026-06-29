import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { auth, database } from "../../firebase/firebase";
import { DB_ROOT } from "../../utils/constants";
import {
  registrationSchema,
  type RegistrationFormData,
} from "../../utils/validationSchema";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import css from "../../styles/shared/Form.module.css";

interface RegistrationFormProps {
  onClose: () => void;
}

export const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { handleSuccess, handleError } = useFormHelpers({ onClose });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setServerError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.name,
      });

      // Realtime Database'e kullanıcıyı kaydetme
      await set(ref(database, `${DB_ROOT}/psychologists/users/${user.uid}`), {
        username: data.name,
        email: data.email,
      });

      handleSuccess("Registration successful!");
    } catch (error: unknown) {
      // "unknown" tipi güvenli bir şekilde objeye dönüştürülerek "code" okunuyor
      const firebaseError = error as { code?: string };

      if (firebaseError.code === "auth/email-already-in-use") {
        const msg = "Email is already in use.";
        setServerError(msg);
        handleError(error, msg);
      } else {
        const msg = handleError(error, "Failed to register.");
        setServerError(msg);
      }
    }
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Registration</h2>
      <p className={css.description}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <div className={css.inputGroup}>
        {/* İsim Alanı */}
        <div className={css.inputWrapper}>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className={css.input}
            aria-invalid={!!errors.name} // A11y
            {...register("name")}
          />
          {errors.name && (
            <p className={css.errorText} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Alanı */}
        <div className={css.inputWrapper}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={css.input}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className={css.errorText} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Şifre Alanı */}
        <div className={css.inputWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={css.input}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          {errors.password && (
            <p className={css.errorText} role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* Sunucu Hata Mesajı */}
      {serverError && (
        <p className={css.errorText} role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        className={css.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Sign Up"}
      </button>
    </form>
  );
};
