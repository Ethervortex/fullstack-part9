import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';
import { HealthCheckRating } from '../types';

interface EntryProps {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

export interface HealthCheckEntryFormValues {
  type: 'HealthCheck';
  description: string;
  date: string;
  specialist: string;
  healthCheckRating: HealthCheckRating;
  diagnosisCodes: string[];
}

const HealthCheckEntryForm: React.FC<EntryProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleDiagnosisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDiagnosisCodes(value.split(',').map(code => code.trim()));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ type: 'HealthCheck', description, date, specialist, healthCheckRating, diagnosisCodes });
  };

  return (
    <Box component="form" onSubmit={handleAdd} sx={{ mt: 1, padding: "10px", borderRadius: 1, border: '1px solid black'}}>
      <Typography variant="h5">New Health Check entry</Typography>
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <TextField
        label="Date"
        fullWidth
        margin="normal"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        margin="normal"
        value={specialist}
        onChange={(event) => setSpecialist(event.target.value)}
      />
      <TextField
        select
        label="Health Check rating"
        fullWidth
        margin="normal"
        value={healthCheckRating}
        onChange={(event) => setHealthCheckRating(Number(event.target.value))}
      >
        <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
        <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
        <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
        <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
      </TextField>
      <TextField
        label="Diagnosis codes"
        fullWidth
        margin="normal"
        value={diagnosisCodes.join(', ')}
        onChange={handleDiagnosisChange}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button style={{ color: 'white', backgroundColor: 'red', borderColor: 'red' }} onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">Add</Button>
      </Box>
    </Box>
  );
};

export default HealthCheckEntryForm;