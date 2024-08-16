import axios from "axios";

const api = axios.create({});

api.defaults.validateStatus = (status) => {
  if (status >= 400) return false;

  return true;
};

export { api };
