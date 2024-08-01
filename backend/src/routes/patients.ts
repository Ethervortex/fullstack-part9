import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const patRouter = express.Router();

patRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});
  
patRouter.post('/', (req, res) => {
  try {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedPatient = patientService.addPatient(newPatientEntry);
  res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patRouter.get('/:id', (req, res) => {
  try {
    const patient = patientService.getByID(req.params.id);
    if (patient === undefined) { 
      res.status(404);
    }
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patRouter.post('/:id/entries', (req, res) => {
  try {
    const parsedEntry = toNewEntry(req.body);
    const patientWithNewEntry = patientService.addEntry(req.params.id, parsedEntry);
    if (patientWithNewEntry === undefined) {
      res.status(404).send('Unable to find patient');
    } else {
      res.json(patientWithNewEntry);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patRouter;