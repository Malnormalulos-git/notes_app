import { Icon } from "@mui/material";
import logo from "/logo.ico"

const Logo = () => {
  return (
    <Icon>
      <img src={logo} height={25} width={25}/>
    </Icon>
  );
}

export default Logo;