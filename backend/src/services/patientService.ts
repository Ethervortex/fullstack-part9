import patientEntries from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
    return patientEntries;
  }

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
}

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};