import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatient, Patient, NewPatientEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getByID = ( id: string ): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
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