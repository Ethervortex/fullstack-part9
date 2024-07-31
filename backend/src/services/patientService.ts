import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatient, Patient, NewPatientEntry, NewEntry } from '../types';

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
    ...patient,
    entries: []
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

const addEntry = (pId: string, newEntry: NewEntry): Patient | undefined => {
  const patient = patients.find(patient => patient.id === pId);
  if (!patient) {
    return undefined;
  }
  const entryWithId = {
    id: uuid(),
    ...newEntry
  };
  patient.entries.push(entryWithId);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getByID,
  addEntry
};