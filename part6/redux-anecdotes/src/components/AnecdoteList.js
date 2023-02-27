import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdotes = ({ content, votes, handleVote }) => {
  return (
    <>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") return anecdotes;

    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });
  const handleVote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(
      setNotification(`You voted "${anecdote.content.slice(0, 30)}..."`, 5)
    );
  };
  return (
    <>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdotes
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleVote={() => handleVote(anecdote)}
          />
        ))}
    </>
  );
};

export default AnecdoteList;
