import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface EntryProps {
  onSubmit: (values: OccupationalEntryFormValues) => void;
  onCancel: () => void;
}

export interface OccupationalEntryFormValues {
  type: 'OccupationalHealthcare';
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  };
}

const OccupationalEntryForm: React.FC<EntryProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const handleDiagnosisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDiagnosisCodes(value.split(',').map(code => code.trim()));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'OccupationalHealthcare', 
      description, 
      date, 
      specialist, 
      diagnosisCodes,
      employerName,
      sickLeave: sickLeaveStartDate && sickLeaveEndDate ? {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      } : undefined,
    });
  };

  return (
    <Box component="form" onSubmit={handleAdd} sx={{ mt: 1, padding: "10px", borderRadius: 1, border: '1px solid black'}}>
      <Typography variant="h5">New Occupational Healthcare entry</Typography>
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
        label="Employer Name"
        fullWidth
        margin="normal"
        value={employerName}
        onChange={(event) => setEmployerName(event.target.value)}
      />
      <TextField
        label="Sick Leave Start Date"
        fullWidth
        margin="normal"
        value={sickLeaveStartDate}
        onChange={(event) => setSickLeaveStartDate(event.target.value)}
      />
      <TextField
        label="Sick Leave End Date"
        fullWidth
        margin="normal"
        value={sickLeaveEndDate}
        onChange={(event) => setSickLeaveEndDate(event.target.value)}
      />

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button style={{ color: 'white', backgroundColor: 'red', borderColor: 'red' }} onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">Add</Button>
      </Box>
    </Box>
  );
};

export default OccupationalEntryForm;