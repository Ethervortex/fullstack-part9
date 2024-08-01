import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Container, Button } from '@mui/material';
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, Entry, HealthCheckRating } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Favorite } from '@mui/icons-material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthCheckEntryForm, { HealthCheckEntryFormValues } from './HealthcheckEntryForm';
import HospitalEntryForm, { HospitalEntryFormValues } from './HospitalEntryForm';
import OccupationalEntryForm, { OccupationalEntryFormValues } from './OccupationalEntryForm';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
}

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== "HealthCheck") return null;
  
  const getHeart = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" style={{ marginRight: "10px" }}>{entry.date}</Typography>
        <MedicalServicesIcon />
      </Box>
      <Typography variant="body1" style={{ fontStyle: "italic" }}>{entry.description}</Typography>
      
      <Box display="flex" alignItems="center">
        <Typography variant="body1" style={{ marginRight: "10px" }}>
          Health Check Rating:
        </Typography>
        <Favorite style={{ color: getHeart(entry.healthCheckRating) }} />
      </Box>
    </>
  );
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== "Hospital") return null;

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" style={{ marginRight: "10px" }}>{entry.date}</Typography>
        <LocalHospitalIcon />
      </Box>
      <Typography variant="body1" style={{ fontStyle: "italic" }}>{entry.description}</Typography>
      
    </>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== "OccupationalHealthcare") return null;

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" style={{ marginRight: "10px" }}>{entry.date}</Typography>
        <WorkIcon />
        <Typography variant="body1" style={{ marginLeft: "10px" }}>{entry.employerName}</Typography>
      </Box>
      <Typography variant="body1" style={{ fontStyle: "italic" }}>{entry.description}</Typography>
      
    </>
  );
};

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showHospitalForm, setShowHospitalForm] = useState(false);
  const [showOccupationalForm, setShowOccupationalForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const getPatientData = async () => {
    if (id) {
      try {
        const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        setPatient(res.data);
      } catch (error: unknown) {
        console.error("Error getting patient details:", error);
      }
    }
  };

  const getDiagnoses = async () => {
    try {
      const res = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      setDiagnoses(res.data);
    } catch (error: unknown) {
      console.error("Error getting diagnoses:", error);
    }
  };

  useEffect(() => {
    getPatientData();
    getDiagnoses();
  }, [id]);

  if (!patient) return <div>Loading patient data...</div>;

  const renderCodeName = (code: string) => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? `${code} ${diagnosis.name}` : code;
  };

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

  const handleFormSubmit = async (values: HealthCheckEntryFormValues) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, values);
      console.log('New health check entry:', response.data);
      await getPatientData();
      setShowForm(false);
      setFormError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        //console.log(error.response)
        setFormError(error.response.data || 'Unknown error');
      } else {
        setFormError('Unexpected error occurred');
      }
      console.error('Error submitting health check entry:', error);
    } 
  };

  const handleHospitalSubmit = async (values: HospitalEntryFormValues) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, values);
      console.log('New hospital entry:', response.data);
      await getPatientData();
      setShowHospitalForm(false);
      setFormError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setFormError(error.response.data || 'Unknown error');
      } else {
        setFormError('Unexpected error occurred');
      }
      console.error('Error submitting hospital entry:', error);
    }
  };

  const handleOccupationalSubmit = async (values: OccupationalEntryFormValues) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, values);
      console.log('New occupational healthcare entry:', response.data);
      await getPatientData();
      setShowOccupationalForm(false);
      setFormError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setFormError(error.response.data || 'Unknown error');
      } else {
        setFormError('Unexpected error occurred');
      }
      console.error('Error submitting occupational healthcare entry:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowHospitalForm(false);
    setShowOccupationalForm(false);
    setFormError(null);
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
      {formError && (
        <Typography color="error" variant="body2" style={{ marginTop: "10px", marginBottom: "10px" }}>
          {formError}
        </Typography>
      )}

      <Box display="flex" style={{ marginTop: "20px" }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setShowForm(true);
            setShowHospitalForm(false);
            setShowOccupationalForm(false);
          }}
          style={{ marginRight: "10px" }}
        >
          Add Health Check entry
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setShowHospitalForm(true);
            setShowForm(false);
            setShowOccupationalForm(false);
          }}
          style={{ marginRight: "10px" }}
        >
          Add Hospital entry
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setShowOccupationalForm(true);
            setShowHospitalForm(false);
            setShowForm(false);
          }}
        >
          Add Occupational Healthcare entry
        </Button>
      </Box>

      {showForm && (
        <HealthCheckEntryForm 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancel} 
        />
      )}

      {showHospitalForm && (
        <HospitalEntryForm 
          onSubmit={handleHospitalSubmit} 
          onCancel={handleCancel} 
        />
      )}

      {showOccupationalForm && (
        <OccupationalEntryForm 
          onSubmit={handleOccupationalSubmit} 
          onCancel={handleCancel} 
        />
      )}

      <Typography variant="h5" style={{ marginTop: "15px", marginBottom: "10px" }}>entries</Typography>
      {patient.entries.map((entry) => (
        <Box key={entry.id} style={{ marginBottom: "10px", border: "1px solid #000", padding: "10px", borderRadius: "5px"}}>
          <EntryDetails entry={entry} />
          <Typography variant="body1">diagnosed by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{renderCodeName(code)}</li>
              ))}
            </ul>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default PatientDetails;