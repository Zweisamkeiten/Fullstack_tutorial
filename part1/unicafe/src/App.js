// vim: set ft=javascriptreact :

import { useState } from "react";

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

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

export default App;
