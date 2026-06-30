import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import type { Psychologist } from "../../types/psychologist";
import { Modal } from "../Modal/Modal";
import { AppointmentForm } from "../AppointmentForm/AppointmentForm";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import clsx from "clsx";
import css from "./PsychologistCard.module.css";

interface PsychologistCardProps {
  psychologist: Psychologist;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export const PsychologistCard = ({
  psychologist,
  onToggleFavorite,
  isFavorite,
}: PsychologistCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const appointmentModal = useModal();

  return (
    <>
      <div className={css.card}>
        <div className={css.avatarWrapper}>
          <img
            src={psychologist.avatar_url}
            alt={`${psychologist.name} profile`}
            className={css.avatar}
            loading="lazy"
          />
          <div className={css.onlineStatus} aria-label="Online status" />
        </div>

        <div className={css.content}>
          <div className={css.header}>
            <div className={css.titleGroup}>
              <span className={css.role}>Psychologist</span>
              <h3 className={css.name}>{psychologist.name}</h3>
            </div>

            <div className={css.metaInfo}>
              <div className={css.rating}>
                <FaStar className={css.starIcon} size={16} aria-hidden="true" />
                <span>Rating: {psychologist.rating}</span>
              </div>
              <div className={css.price}>
                Price / 1 hour:{" "}
                <span className={css.priceValue}>
                  ${psychologist.price_per_hour}
                </span>
              </div>
              <button
                className={clsx(css.favoriteButton, {
                  [css.favoriteActive]: isFavorite,
                })}
                onClick={onToggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? <FaHeart size={26} /> : <FaRegHeart size={26} />}
              </button>
            </div>
          </div>

          <div className={css.attributesList}>
            <div className={css.attributeTag}>
              Experience:{" "}
              <span className={css.attributeValue}>
                {psychologist.experience}
              </span>
            </div>
            <div className={css.attributeTag}>
              License:{" "}
              <span className={css.attributeValue}>
                {psychologist.license}
              </span>
            </div>
            <div className={css.attributeTag}>
              Specialization:{" "}
              <span className={css.attributeValue}>
                {psychologist.specialization}
              </span>
            </div>
            <div className={css.attributeTag}>
              Initial consultation:{" "}
              <span className={css.attributeValue}>
                {psychologist.initial_consultation}
              </span>
            </div>
          </div>

          <p className={css.description}>{psychologist.about}</p>

          {!isExpanded && (
            <button
              className={css.readMoreButton}
              onClick={() => setIsExpanded(true)}
              aria-expanded={isExpanded}
            >
              Read more
            </button>
          )}

          {isExpanded && (
            <div className={css.expandedContent}>
              <ul className={css.reviewsList}>
                {psychologist.reviews?.length > 0 ? (
                  psychologist.reviews.map((review, index) => (
                    <li key={index} className={css.reviewItem}>
                      <div className={css.reviewerAvatar}>
                        {review.reviewer ? review.reviewer.charAt(0).toUpperCase() : "A"}
                      </div>
                      <div className={css.reviewContent}>
                        <h4 className={css.reviewerName}>
                          {review.reviewer || "Anonymous"}
                        </h4>
                        <div className={css.reviewRating}>
                          <FaStar className={css.starIcon} size={16} />
                          <span>{review.rating}</span>
                        </div>
                        <p className={css.reviewComment}>{review.comment}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className={css.noReviews}>No reviews yet.</p>
                )}
              </ul>
              <button
                className={css.appointmentButton}
                onClick={appointmentModal.open}
              >
                Make an appointment
              </button>
            </div>
          )}
        </div>
      </div>

      {appointmentModal.isOpen && (
        <Modal isOpen={appointmentModal.isOpen} onClose={appointmentModal.close}>
          <AppointmentForm
            psychologist={psychologist}
            onClose={appointmentModal.close}
          />
        </Modal>
      )}
    </>
  );
};