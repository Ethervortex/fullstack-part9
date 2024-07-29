/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const patRouter = express.Router();

patRouter.get('/', (_req, res) => {
  // res.send('Fetching all patients');
  res.send(patientService.getNonSensitivePatients());
});
  
patRouter.post('/', (req, res) => {
  // res.send('Saving a patient');
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedPatient);
});

export default patRouter;