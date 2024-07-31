import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Container } from '@mui/material';
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const getPatient = async () => {
        try {
          const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          setPatient(res.data);
        } catch (error: unknown) {
          console.error("Error getting patient details:", error);
        }
      };
      getPatient();
    }
  }, [id]);

  if (!patient) return <div>Loading patient data...</div>;

  const renderGender = (gender: 'male' | 'female' | 'other') => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box display="flex" style={{ marginTop: "20px" }}>
        <Typography variant="h5" style={{ marginRight: "10px" }}>{patient.name}</Typography>
        {renderGender(patient.gender)}
      </Box>
      <Typography variant="body1">SSN: {patient.ssn}</Typography>
      <Typography variant="body1">Gender: {patient.gender}</Typography>
      <Typography variant="body1">Date of Birth: {patient.dateOfBirth}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="h5" style={{ marginTop: "15px", marginBottom: "10px" }}>entries</Typography>
      {patient.entries.map((entry) => (
        <Box key={entry.id} style={{ marginBottom: "10px" }}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: "10px" }}>{entry.date}</Typography>
            <Typography variant="body1" style={{ fontStyle: "italic" }}>{entry.description}</Typography>
          </Box>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default PatientDetails;