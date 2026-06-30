import type { PSYCHOLOGIST_FILTERS } from "../utils/constants";

export interface Psychologist {
    id: string;
    name: string;
    avatar_url: string;
    experience: string;
    reviews: Review[];
    price_per_hour: number;
    rating: number;
    license: string;
    specialization: string;
    initial_consultation: string;
    about: string;
}

export interface Review {
    reviewer: string;
    rating: number;
    comment: string;
}

export type Theme = "green" | "blue" | "orange";

export interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export type PsychologistFilterOption = typeof PSYCHOLOGIST_FILTERS[keyof typeof PSYCHOLOGIST_FILTERS];