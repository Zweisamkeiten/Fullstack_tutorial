// vim: set ft=javascriptreact :

import { useState } from "react";

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [votes, setvotes] = useState(new Array(anecdotes.length).fill(0));

  const [selected, setselected] = useState(0);

  const nextAnecdote = () => {
    // generate a random number to choose an anecdote.
    setselected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setvotes(copy);
  };

  const indexOfMostVotes = (votes) => {
    const max = Math.max(...votes);
    return votes.indexOf(max);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={voteClick} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote
        text={anecdotes[indexOfMostVotes(votes)]}
        votes={votes[indexOfMostVotes(votes)]}
      />
    </div>
  );
};

export default App;
