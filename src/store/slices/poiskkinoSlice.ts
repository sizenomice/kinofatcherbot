import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'GDCF1AP-7494FC8-GT86M2M-DBB9K3X';
const BASE_URL = 'https://api.poiskkino.dev';

export interface Movie {
  id: number;
  name: string;
  alternativeName?: string;
  year?: number;
  description?: string;
  rating?: {
    kp?: number;
    imdb?: number;
  };
  poster?: {
    url?: string;
    previewUrl?: string;
  };
  genres?: Array<{ name: string }>;
  countries?: Array<{ name: string }>;
  type?: string;
  movieLength?: number;
}

export interface MoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface SearchParams {
  query: string;
  limit?: number;
  page?: number;
}

export interface MoviesParams {
  page?: number;
  limit?: number;
  year?: number | string;
  'genres.name'?: string | string[];
  'countries.name'?: string | string[];
  'rating.kp'?: string;
  'rating.imdb'?: string;
  isSeries?: boolean;
  type?: string;
  [key: string]: any;
}

export const poiskkino = createApi({
  reducerPath: 'poiskkino',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Movies'],
  // Кэширование данных на 5 минут для улучшения производительности
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, MoviesParams | void>({
      query: (params = {}) => ({
        url: '/v1.4/movie',
        params: {
          limit: 20,
          ...params,
        },
      }),
      providesTags: ['Movies'],
      // Кэширование на уровне эндпоинта
      keepUnusedDataFor: 300,
    }),

    searchMovies: builder.query<MoviesResponse, SearchParams>({
      query: (searchParams) => ({
        url: '/v1.4/movie/search',
        params: {
          query: searchParams.query,
          limit: searchParams.limit || 20,
          page: searchParams.page || 1,
        },
      }),
      providesTags: ['Movies'],
      // Кэширование результатов поиска на 2 минуты
      keepUnusedDataFor: 120,
    }),

    getMovieById: builder.query<Movie, number>({
      query: (id) => `/v1.4/movie/${id}`,
    }),

    getRandomMovie: builder.query<Movie, void>({
      query: () => '/v1.4/movie/random',
    }),

  }),
});

export const {
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieByIdQuery,
  useGetRandomMovieQuery,
} = poiskkino;
