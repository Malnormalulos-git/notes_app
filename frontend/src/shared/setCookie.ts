const setCookie = (name: string, value: string, ExpiresIn?: number) => {
  let expires = "";
  if (ExpiresIn) {
    const date = new Date();
    date.setTime(date.getTime() + (ExpiresIn * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires};`;
}

export default setCookie;
