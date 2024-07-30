import patientEntries from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';

const getPatients = (): Patient[] => {
  return patientEntries;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient
  };
  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

const getByID = ( id: string ): Patient | undefined => {
  const patient = patientEntries.find(p => p.id === id);
  if (patient && !patient?.entries){
    patient.entries = [];
  }
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getByID
};