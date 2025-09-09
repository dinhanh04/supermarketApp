import { IAddress, NewAddress } from './address.model';

export const sampleWithRequiredData: IAddress = {
  id: 2568,
  line1: 'admired yum',
  city: 'Anderson',
  country: 'New Caledonia',
};

export const sampleWithPartialData: IAddress = {
  id: 2411,
  line1: 'gallivant adumbrate self-assured',
  line2: 'but lively monumental',
  city: 'Cindystead',
  country: 'Bulgaria',
};

export const sampleWithFullData: IAddress = {
  id: 16440,
  line1: 'ouch molasses',
  line2: 'overdue obsess willfully',
  ward: 'gosh yowza fort',
  district: 'while',
  city: "O'Keefetown",
  country: 'Liechtenstein',
  postalCode: 'cannon',
};

export const sampleWithNewData: NewAddress = {
  line1: 'zowie uh-huh pitiful',
  city: 'Carson City',
  country: 'Taiwan',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
