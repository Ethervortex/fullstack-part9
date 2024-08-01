import { Entry } from "../types";
import { Typography, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

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

  export default HospitalEntry;