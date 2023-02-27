import anecdotesService from "../services/anecdotes";
import { createSlice } from "@reduxjs/toolkit";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const votedAnecdote = action.payload;

      const { id } = votedAnecdote;
      console.log(typeof id, id);
      return state.map((anecdote) =>
        anecdote.id === id ? votedAnecdote : anecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateVote, setAnecdotes, appendAnecdote } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.update(anecdote);
    dispatch(updateVote(votedAnecdote));
  };
};

export default anecdotesSlice.reducer;

// const anecdotesReducer = (state = initialState.anecdotes, action) => {
//   switch (action.type) {
//     case "NEW_ANECDOTE": {
//       return [...state, action.payload];
//     }

//     case "INCREASE_VOTE": {
//       const id = action.payload.id;
//       const anectodeToChange = state.find((anecdote) => anecdote.id === id);
//       const updateAnectode = {
//         ...anectodeToChange,
//         votes: anectodeToChange.votes + 1,
//       };

//       return state.map((anecdote) =>
//         anecdote.id === id ? updateAnectode : anecdote
//       );
//     }

//     default:
//       return state;
//   }
// };

// export const createAnecdote = (content) => {
//   return {
//     type: "NEW_ANECDOTE",
//     payload: {
//       content,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

// export const increaseVote = (id) => {
//   return {
//     type: "INCREASE_VOTE",
//     payload: { id },
//   };
// };
