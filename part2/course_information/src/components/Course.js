import React from "react";

const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
	//console.log(course);
	var totalExercises = course.parts.reduce((sum, one) => {
		return sum + one.exercises;
	}, 0);
	return <b>total of {totalExercises} exercises</b>;
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

/*
const Content = ({ course }) => {
	return (
		<div>
			<Part part={course.parts[0]} />
			<Part part={course.parts[1]} />
			<Part part={course.parts[2]} />
		</div>
	);
};
*/
const Content = ({ course }) => {
	const parts = course.parts;
	//console.log(parts);
	return (
		<div>
			{parts.map((part) => {
				//console.log(part);
				return <Part key={part.id} part={part} />;
			})}
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	);
};

export default Course;
