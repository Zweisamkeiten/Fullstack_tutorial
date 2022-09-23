// vim: set ft=javascriptreact :

import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;
  if (all != 0) {
    return (
      <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
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
      <button onClick={() => setgood(good + 1)}>good</button>
      <button onClick={() => setneutral(neutral + 1)}>neutral</button>
      <button onClick={() => setbad(bad + 1)}>bad</button>
      <h1>statistics feedback</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
