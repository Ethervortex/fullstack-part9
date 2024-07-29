import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagRouter = express.Router();

diagRouter.get('/', (_req, res) => {
  // res.send('Fetching all diagnoses');
  res.send(diagnoseService.getEntries());
});

diagRouter.post('/', (_req, res) => {
  res.send('Saving a diagnose');
});

export default diagRouter;