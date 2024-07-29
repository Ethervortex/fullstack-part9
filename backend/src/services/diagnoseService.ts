import diagnoseEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnoseEntries;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};