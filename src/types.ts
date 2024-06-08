export interface FilmType {
  cast: string,
  cinema_address: string,
  cinema_name: string,
  cinema_town: string
  french_title: string,
  genres: string,
  imdb_url: string,
  languages: string,
  origin_country: string,
  original_title: string,
  poster_lo_res: string,
  poster_hi_res: string,
  rating?: number,
  release_date: string,
  runtime: number,
  synopsis: string,
  tagline: string,
}

export interface UnsortedFilmType extends FilmType {
  start_time: {
    date: string,
    time: string
  }
}

export interface TimeSortedFilmType extends FilmType {
  dates: {
    [key: string]: string[];
  }
}
