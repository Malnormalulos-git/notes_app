const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}`;
}

export default setCookie;