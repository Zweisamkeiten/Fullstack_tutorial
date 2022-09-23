// vim: set ft=javascriptreact :

import { useState } from "react";

const Statisticsline = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleclick}>{props.text}</button>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;
  if (all != 0) {
    return (
      <>
        <Statisticsline text="good" value={good} />
        <Statisticsline text="neutral" value={neutral} />
        <Statisticsline text="bad" value={bad} />
        <Statisticsline text="all" value={all} />
        <Statisticsline text="average" value={average} />
        <Statisticsline text="positive" value={positive + " %"} />
      </>
    );
  }
  return <p>No feedback given</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setgood] = useState(0);
  const [neutral, setneutral] = useState(0);
  const [bad, setbad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleclick={() => setgood(good + 1)} text="good" />
      <Button handleclick={() => setneutral(neutral + 1)} text="neutral" />
      <Button handleclick={() => setbad(bad + 1)} text="bad" />
      <h1>statistics feedback</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
