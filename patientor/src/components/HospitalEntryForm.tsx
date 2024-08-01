import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface EntryProps {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export interface HospitalEntryFormValues {
  type: 'Hospital';
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  discharge?: {
    date: string,
    criteria: string
  }
}

const HospitalEntryForm: React.FC<EntryProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleDiagnosisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDiagnosisCodes(value.split(',').map(code => code.trim()));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'Hospital', 
      description, 
      date, 
      specialist, 
      diagnosisCodes, 
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleAdd} sx={{ mt: 1, padding: "10px", borderRadius: 1, border: '1px solid black'}}>
      <Typography variant="h5">New Hospital entry</Typography>
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
        label="Diagnosis codes"
        fullWidth
        margin="normal"
        value={diagnosisCodes.join(', ')}
        onChange={handleDiagnosisChange}
      />
      <TextField
        label="Discharge date"
        fullWidth
        margin="normal"
        value={dischargeDate}
        onChange={(event) => setDischargeDate(event.target.value)}
      />
      <TextField
        label="Discharge criteria"
        fullWidth
        margin="normal"
        value={dischargeCriteria}
        onChange={(event) => setDischargeCriteria(event.target.value)}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button style={{ color: 'white', backgroundColor: 'red', borderColor: 'red' }} onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">Add</Button>
      </Box>
    </Box>
  );
};

export default HospitalEntryForm;