// vim: set ft=javascriptreact :

import { useState } from "react";

const Statistics = (props) => {
  return (
    <>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.neutral + props.bad}</p>
      <p>average {(props.good * 1 + props.neutral * 0 + props.bad * -1) / 3}</p>
      <p>
        positive {(props.good / (props.good + props.neutral + props.bad)) * 100}{" "}
        %
      </p>
    </>
  );
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
