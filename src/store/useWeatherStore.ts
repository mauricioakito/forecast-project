import { create } from 'zustand';
import type { ICardDataProps } from '../types/Card';
import { INITIAL_MESSAGE } from '../constraints/Home';

interface WeatherStore {
  cardData?: ICardDataProps[];
  setCardData: (data: ICardDataProps[] | undefined) => void;

  isSearching: boolean;
  setIsSearching: (value: boolean) => void;

  status: string;
  setStatus: (value: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  cardData: undefined,
  setCardData: (data) => set({ cardData: data }),

  isSearching: false,
  setIsSearching: (value) => set({ isSearching: value }),

  status: INITIAL_MESSAGE,
  setStatus: (value) => set({ status: value }),
}));
