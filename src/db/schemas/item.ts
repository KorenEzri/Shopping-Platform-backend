import mongoose, { Schema } from 'mongoose';
import { SearchDoc } from '../../../types';

const searchDbSchema: Schema = new mongoose.Schema({
  __id: String,
  title: String,
  descriptions: Array,
  prices: Array,
  images: Array,
});

searchDbSchema.set('toJSON', {
  transform: (_: any, returnedObject: any) => {
    delete returnedObject.__v;
  },
});

export const Search = mongoose.model<SearchDoc>('Search', searchDbSchema);
