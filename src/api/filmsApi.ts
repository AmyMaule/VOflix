import { getData } from "./client";
import {
  FilmType,
  RawShowingType,
  CinemaType
} from "../types";

export const filmsApi = {
  getFilms: (): Promise<Record<string, FilmType>> => {
    return getData<Record<string, FilmType>>("/search/movies");
  },

  getShowings: (): Promise<RawShowingType[]> => {
    return getData<RawShowingType[]>("/search/showings");
  },

  getCinemas: (): Promise<Record<string, CinemaType>> => {
    return getData<Record<string, CinemaType>>("/cinemas");
  },
}
