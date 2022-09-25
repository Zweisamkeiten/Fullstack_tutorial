import React from "react";

const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => (
  <b>
    <p>Number of exercises {sum}</p>
  </b>
);

const Part = ({ part }) => {
  // console.log(part);
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  // console.log(parts[0]);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  // console.log(course);
  const exercises_array = course.parts.map((c) => c.exercises);
  const sum = exercises_array.reduce((previousValue, currentValue) => {
    // console.log("what is happening", previousValue, currentValue);
    return previousValue + currentValue;
  });
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  );
};

export default Course;
