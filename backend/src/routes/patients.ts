import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const patRouter = express.Router();

patRouter.get('/', (_req, res) => {
  // res.send('Fetching all patients');
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

export default patRouter;