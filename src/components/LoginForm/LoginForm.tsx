import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EyeIcon, EyeOffIcon } from "../../assets/icons";
import { auth } from "../../firebase/firebase";
import { loginSchema, type LoginFormData } from "../../utils/validationSchema";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import css from "../../styles/shared/Form.module.css";

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { handleSuccess, handleError } = useFormHelpers({ onClose });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      handleSuccess("Logged in successfully!");
    } catch (error: unknown) {
      const msg = handleError(error, "Invalid email or password.");
      setServerError(msg);
    }
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>

      <div className={css.inputGroup}>
        <div className={css.inputWrapper}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={css.input}
            aria-invalid={!!errors.email} // Ekran okuyucular için hata durumu bildirimi
            {...register("email")}
          />
          {errors.email && (
            <p className={css.errorText} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

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
            aria-label={showPassword ? "Hide password" : "Show password"} // A11y geliştirmesi
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
          {errors.password && (
            <p className={css.errorText} role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

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
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};
