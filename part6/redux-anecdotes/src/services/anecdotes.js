import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const update = async (anecdote) => {
  console.log(typeof anecdote);
  const { id } = anecdote;
  const votes = { votes: anecdote.votes + 1 };
  const response = await axios.patch(`${baseUrl}/${id}`, votes);
  console.log(response.data);
  return response.data;
};

export default { getAll, createNew, update };
