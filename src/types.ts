import { Nullable } from 'unsplash-js/dist/helpers/typescript';

export type Photo = {
  id: string;
  urls: {
    full: string;
    regular: string;
    raw: string;
    small: string;
    thumb: string;
  };
  user: {
    username: string;
    name: string;
    location: Nullable<string>;
  };
};

export type Status = 'idle' | 'loading' | 'success' | 'error';
