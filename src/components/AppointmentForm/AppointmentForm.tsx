import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useFormHelpers } from "../../hooks/useFormHelpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClockIcon } from "../../assets/icons";
import type { Psychologist } from "../../types/psychologist";
import { timeSlots } from "../../utils/constants";
import { appointmentSchema, type AppointmentFormData } from "../../utils/validationSchema";
import clsx from "clsx";
import css from "./AppointmentForm.module.css";

interface AppointmentFormProps {
  psychologist: Psychologist;
  onClose: () => void;
}

export const AppointmentForm = ({
  psychologist,
  onClose,
}: AppointmentFormProps) => {
  const { currentUser } = useAuth();
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const timeWrapperRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
  });

  const { handleSuccess } = useFormHelpers({ onClose, reset });
  const selectedTime = watch("time");

  // Oturum açmış kullanıcının verilerini forma otomatik doldur
  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.displayName) {
      setValue("name", currentUser.displayName);
    }
    if (currentUser.email) {
      setValue("email", currentUser.email);
    }
    if (currentUser.phoneNumber) {
      setValue("phone", currentUser.phoneNumber);
    }
  }, [currentUser, setValue]);

  // Özel açılır menüyü dışarı tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeWrapperRef.current &&
        !timeWrapperRef.current.contains(event.target as Node)
      ) {
        setIsTimeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTimeSelect = (time: string) => {
    setValue("time", time, { shouldValidate: true });
    setIsTimeOpen(false);
  };

  const onSubmit = () => {
    handleSuccess("Appointment request sent successfully!");
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Make an appointment with a psychologist</h2>
      <p className={css.description}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      <div className={css.psychologistInfo}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={css.avatar}
        />
        <div className={css.psychologistText}>
          <span className={css.label}>Your psychologist</span>
          <span className={css.name}>{psychologist.name}</span>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <input
            type="text"
            placeholder="Name"
            className={css.input}
            {...register("name")}
          />
          {errors.name && (
            <p className={css.errorText}>{errors.name.message}</p>
          )}
        </div>

        <div className={css.inputsRow}>
          <div className={css.inputWrapper}>
            <input
              type="tel"
              placeholder="+380998887766"
              className={css.input}
              {...register("phone")}
            />
            {errors.phone && (
              <p className={css.errorText}>{errors.phone.message}</p>
            )}
          </div>

          <div
            className={css.timeWrapper}
            ref={timeWrapperRef}
            onClick={() => setIsTimeOpen((prev) => !prev)}
          >
            <div
              className={clsx(css.timeInput, {
                [css.timeInputActive]: isTimeOpen,
              })}
            >
              <span
                className={clsx(css.timeValue, {
                  [css.placeholder]: !selectedTime,
                })}
              >
                {selectedTime || "00:00"}
              </span>
              <ClockIcon className={css.clockIcon} />
            </div>

            {isTimeOpen && (
              <div className={css.timeDropdown}>
                <div className={css.timeDropdownHeader}>Meeting time</div>
                <div className={css.timeList}>
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className={clsx(css.timeOption, {
                        [css.timeOptionSelected]: time === selectedTime,
                      })}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTimeSelect(time);
                      }}
                    >
                      {time.replace(":", " : ")}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <input type="hidden" {...register("time")} />
            {errors.time && (
              <p className={css.errorText}>{errors.time.message}</p>
            )}
          </div>
        </div>

        <div className={css.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            className={css.input}
            {...register("email")}
          />
          {errors.email && (
            <p className={css.errorText}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.inputWrapper}>
          <textarea
            placeholder="Comment"
            className={css.textarea}
            {...register("comment")}
          />
          {errors.comment && (
            <p className={css.errorText}>{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          Send
        </button>
      </form>
    </div>
  );
};