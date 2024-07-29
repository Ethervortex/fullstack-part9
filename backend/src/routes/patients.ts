import express from 'express';
import patientService from '../services/patientService';

const patRouter = express.Router();

patRouter.get('/', (_req, res) => {
    // res.send('Fetching all patients');
    res.send(patientService.getNonSensitivePatients());
  });
  
  patRouter.post('/', (_req, res) => {
    res.send('Saving a patient');
  });
  
  export default patRouter;