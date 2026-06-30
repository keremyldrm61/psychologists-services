import { useMemo } from "react";
import type { Psychologist } from "../types/psychologist";
import { PSYCHOLOGIST_FILTERS } from "../utils/constants";
import { type PsychologistFilterOption } from "../types/psychologist";

export const usePsychologistFilter = (
  psychologists: Psychologist[],
  filter: PsychologistFilterOption
): Psychologist[] => {
  const filteredPsychologists = useMemo(() => {
    // Mevcut diziyi mutasyona uğratmamak için bir kopyasını alıyoruz
    let resultList = [...psychologists];

    switch (filter) {
      case PSYCHOLOGIST_FILTERS.A_TO_Z:
        resultList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      
      case PSYCHOLOGIST_FILTERS.Z_TO_A:
        resultList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      
      case PSYCHOLOGIST_FILTERS.PRICE_LESS_THAN_10:
        resultList = resultList.filter((p) => p.price_per_hour < 10);
        break;
      
      case PSYCHOLOGIST_FILTERS.PRICE_GREATER_THAN_10:
        resultList = resultList.filter((p) => p.price_per_hour >= 10); // Mantıksal tutarlılık için >= tercih edilebilir
        break;
      
      case PSYCHOLOGIST_FILTERS.POPULAR:
        resultList.sort((a, b) => b.rating - a.rating);
        break;
      
      case PSYCHOLOGIST_FILTERS.NOT_POPULAR:
        resultList.sort((a, b) => a.rating - b.rating);
        break;
      
      case PSYCHOLOGIST_FILTERS.SHOW_ALL:
      default:
        // Varsayılan durumda orijinal liste (kopyası) döner
        break;
    }
    
    return resultList;
  }, [psychologists, filter]);

  return filteredPsychologists;
};