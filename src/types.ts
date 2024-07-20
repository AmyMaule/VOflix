export type DatesType = {
  [date: string]: string[];
}

export interface FilmType {
  cast?: string,
  cinema_id: string,
  // cinema_address: string,
  cinema_name: string,
  cinema_town: string,
  // french_title: string,
  genres: string,
  imdb_url: string,
  // languages: string,
  // origin_country: string,
  original_title: string,
  poster_lo_res: string,
  poster_hi_res: string,
  rating?: number,
  release_date: string,
  runtime: number,
  synopsis: string,
  // tagline: string,
}

export interface UnsortedFilmType extends FilmType {
  start_time: {
    date: string,
    time: string,
    year: string
  }
}

export interface FilmSortedByCinemaType extends FilmType {
  dates: DatesType;
}

export interface FilmSortedByFilmType extends FilmType {
  dates: {
    [cinema: string]: DatesType;
  };
}

export interface CinemaType {
  name: string,
  town: string,
  additional_info: null,
  address: string,
  gps_coordinates: number[]
}

export type FetchedDataType = UnsortedFilmType[] | CinemaType[];

export type DisplayByType = "cinema" | "film";

export type TimeSortedShowingsByCinemaType = {
  [cinema_name: string]: {
    [film_title: string]: FilmSortedByCinemaType;
  }
};

export type TimeSortedShowingsByFilmType = {
  [film_title: string]: FilmSortedByFilmType
};
