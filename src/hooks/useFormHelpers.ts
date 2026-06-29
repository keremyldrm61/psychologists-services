import { useCallback } from "react";
import toast from "react-hot-toast";

interface UseFormHelpersProps {
    onClose: () => void;
    reset?: () => void;
}

export const useFormHelpers = ({ onClose, reset }: UseFormHelpersProps) => {
    
    const handleSuccess = useCallback(
        (message: string) => {
            toast.success(message);
            if (reset) {
                reset();
            }
            onClose();
        },
        [onClose, reset] // Bağımlılıklar: Bunlar değişirse fonksiyon yenilenir
    );

    const handleError = useCallback(
        (error: unknown, defaultMessage: string = "An error occurred"): string => {
            console.error("Form action failed:", error);

            let errorMessage = defaultMessage;

            // Hatayı güvenli bir şekilde ayrıştırıyoruz (Type Guarding)
            if (error instanceof Error) {
                // Standart JavaScript veya Firebase Error objesi
                errorMessage = error.message;
            } else if (typeof error === "object" && error !== null && "message" in error) {
                // message propertysi olan özel bir obje
                errorMessage = String((error as Record<string, unknown>).message);
            } else if (typeof error === "string") {
                // Sadece string fırlatılmış bir hata
                errorMessage = error;
            }

            toast.error(errorMessage);
            return errorMessage;
        },
        [] // Dışarıdan bir state'e bağımlı olmadığı için boş array
    );

    return { handleSuccess, handleError };
};