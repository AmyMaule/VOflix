export type DisplayByType = "cinema" | "film";

export interface CinemaType {
  name: string,
  town: string,
  additional_info: null,
  address: string,
  gps_coordinates: number[]
}

export interface FilmType {
  cast: string,
  genres: string,
  imdb_url: string,
  poster_lo_res: string | undefined,
  poster_hi_res: string | undefined,
  release_date: string | null,
  runtime: number | null,
  synopsis: string,
  rating_imdb: number | null,
  rating_rt: number | null,
  rating_meta: number | null,
}

export interface RawShowingType {
  cinema: string,
  original_title: string,
  start_time: {
    time: string,
    date: string,
    year: string
  }
}

export interface SortedShowingType {
  [cinema: string]: {
    [date: string]: string[]
  }
}

export type DatesType = {
  [date: string]: string[];
}
