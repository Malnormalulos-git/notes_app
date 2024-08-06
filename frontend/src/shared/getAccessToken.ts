import getCookie from "./getCookie";

const getAccessToken = () => {
  return getCookie('access_token');
}

export default getAccessToken;