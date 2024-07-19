const setAccessToken = (accessToken: string) => {
  document.cookie = `access_token=${accessToken}`;
}

export default setAccessToken;