import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'N727ATZ-KP347H3-PB1T8QT-SMREPN3';
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
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesResponse, MoviesParams | void>({
      query: (params = {}) => ({
        url: '/v1.4/movie',
        params: {
          limit: 10,
          ...params,
        },
      }),
      providesTags: ['Movies'],
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
    }),

    getMovieById: builder.query<Movie, number>({
      query: (id) => `/v1.4/movie/${id}`,
    }),

    getRandomMovie: builder.query<Movie, void>({
      query: () => '/v1.4/movie/random',
    }),

    getSeasons: builder.query<any, { movieId?: number; [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/season',
        params,
      }),
    }),

    getMovieAwards: builder.query<any, { movieId?: number; [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/movie/awards',
        params,
      }),
    }),

    getPossibleValues: builder.query<any, { field: string }>({
      query: (params) => ({
        url: '/v1/movie/possible-values-by-field',
        params,
      }),
    }),

    getPersonById: builder.query<any, number>({
      query: (id) => `/v1.4/person/${id}`,
    }),

    getPersons: builder.query<any, { [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/person',
        params,
      }),
    }),

    searchPersons: builder.query<any, { query: string; limit?: number; page?: number }>({
      query: (params) => ({
        url: '/v1.4/person/search',
        params: {
          query: params.query,
          limit: params.limit || 20,
          page: params.page || 1,
        },
      }),
    }),

    getReviews: builder.query<any, { [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/review',
        params,
      }),
    }),

    getStudios: builder.query<any, { [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/studio',
        params,
      }),
    }),

    getKeywords: builder.query<any, { [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/keyword',
        params,
      }),
    }),

    getImages: builder.query<any, { [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/image',
        params,
      }),
    }),

    getLists: builder.query<any, { [key: string]: any }>({
      query: (params = {}) => ({
        url: '/v1.4/list',
        params,
      }),
    }),

    getListBySlug: builder.query<any, string>({
      query: (slug) => `/v1.4/list/${slug}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieByIdQuery,
  useGetRandomMovieQuery,
  useGetSeasonsQuery,
  useGetMovieAwardsQuery,
  useGetPossibleValuesQuery,
  useGetPersonByIdQuery,
  useGetPersonsQuery,
  useSearchPersonsQuery,
  useGetReviewsQuery,
  useGetStudiosQuery,
  useGetKeywordsQuery,
  useGetImagesQuery,
  useGetListsQuery,
  useGetListBySlugQuery,
} = poiskkino;
