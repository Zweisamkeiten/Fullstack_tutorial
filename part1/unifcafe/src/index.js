import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, value }) => (
	<tr>
		<td>{text} </td>
		<td>{value}</td>
	</tr>
);
const Statistics = ({ good, neutral, bad }) => {
	if (good !== 0 || neutral !== 0 || bad !== 0)
		return (
			<div>
				<table>
					<tbody>
						<Statistic text="good" value={good} />
						<Statistic text="neutral" value={neutral} />
						<Statistic text="bad" value={bad} />
						<Statistic text="all" value={good + neutral + bad} />
						<Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
						<Statistic text="positive" value={(good / (good + neutral + bad)) * 100 + "%"} />
					</tbody>
				</table>
			</div>
		);
	return <p>No feedback given</p>;
};

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeuTral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeuTral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={handleGoodClick} text={"good"} />
			<Button onClick={handleNeutralClick} text={"neutral"} />
			<Button onClick={handleBadClick} text={"bad"} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
