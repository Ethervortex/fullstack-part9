import { Entry, HealthCheckRating } from "../types";
import { Typography, Box } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Favorite } from '@mui/icons-material';

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

  export default HealthCheckEntry;