// vim: set ft=javascriptreact :

const Header = (course) => {
  return <h1>{course.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1.name} exercise={props.part1.exercise} />
      <Part part={props.part2.name} exercise={props.part2.exercise} />
      <Part part={props.part3.name} exercise={props.part3.exercise} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercise: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercise: 7,
  };
  const part3 = {
    name: "State of a component",
    exercise: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total
        exercise1={part1.exercise}
        exercise2={part2.exercise}
        exercise3={part3.exercise}
      />
    </div>
  );
};

export default App;
