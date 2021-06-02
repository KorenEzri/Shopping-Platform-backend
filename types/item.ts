import { Document } from 'mongoose';

export interface Search {
  __id: string;
  title: string;
  descriptions: string[];
  prices: string[];
  images: string[];
}

export interface SearchDoc extends Document, Search {}
