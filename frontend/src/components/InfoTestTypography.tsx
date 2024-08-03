import { Typography } from "@mui/material";

interface InfoTextProps{
  text : string;
}
const InfoTextTypography = ({text} : InfoTextProps) => {
  return(
  <Typography
    color="text.secondary" 
    gutterBottom
    whiteSpace="pre-line"
  >
    {text}
  </Typography>
  );
}

export default InfoTextTypography;