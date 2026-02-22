import { getData } from "./client";
import {
  FilmType,
  RawShowingType,
  CinemaType
} from "../types";

export const fetchFilms = (): Promise<Record<string, FilmType>> => {
  return getData<Record<string, FilmType>>("/search/movies");
};

export const fetchShowings = (): Promise<RawShowingType[]> => {
  return getData<RawShowingType[]>("/search/showings");
};

export const fetchCinemas = (): Promise<Record<string, CinemaType>> => {
  return getData<Record<string, CinemaType>>("/cinemas");
};
