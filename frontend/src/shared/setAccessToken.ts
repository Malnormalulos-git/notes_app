import setCookie from "./setCookie";

const setAccessToken = (accessToken: string) => {
  setCookie("access_token", accessToken, 1);
}

export default setAccessToken;