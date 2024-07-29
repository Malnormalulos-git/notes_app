import setCookie from "./setCookie"

const logOut = () => 
{
  setCookie("access_token", "", -1);
}

export default logOut;