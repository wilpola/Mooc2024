import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

// import types
import { IPeople } from "../App";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject: IPeople) => {
  return axios.post(baseUrl, newObject);
};

const update = (id: number, newObject: IPeople) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id: number) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove
};
