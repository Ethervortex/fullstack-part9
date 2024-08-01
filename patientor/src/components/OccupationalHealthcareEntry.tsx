import { Entry } from "../types";
import { Typography, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

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

export default OccupationalHealthcareEntry;