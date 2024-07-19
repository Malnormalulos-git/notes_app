import getCookieByName from "./getCookie";

const getAccessToken = () => {
  return getCookieByName('access_token');
}

export default getAccessToken;