import axios from "axios";
const baseUrl = "http://localhost:8080/api";
const idURL = "http://localhost:3001/nextId";

// import types
import { IPeople } from "../App";

const getAll = () => {
  return axios.get(`${baseUrl}/persons`);
};

const create = (newObject: IPeople) => {
  axios.put(idURL);
  return axios.post(baseUrl, newObject);
};

const getId = () => {
  return axios.get(idURL);
};

const updateId = (id: number) => {
  return axios.put(idURL, id + 1);
};
const update = (id: string, newObject: IPeople) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id: number) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
  getId: getId,
  updateId: updateId,
};
