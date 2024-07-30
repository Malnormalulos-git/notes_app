import { Typography } from "@mui/material";

interface InfoTextProps{
  text : string;
}
const InfoText = ({text} : InfoTextProps) => {
  return(
  <Typography
    color="text.secondary" 
    sx={{
      margin: "0 !important"
    }}
  >
    {text}
  </Typography>
  );
}

export default InfoText;