// vim: set ft=javascriptreact :

const Header = (course) => {
  return <h1>{course.course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (course) => {
  return (
    <div>
      <Part
        part={course.course.parts[0].name}
        exercise={course.course.parts[0].exercise}
      />
      <Part
        part={course.course.parts[1].name}
        exercise={course.course.parts[1].exercise}
      />
      <Part
        part={course.course.parts[2].name}
        exercise={course.course.parts[2].exercise}
      />
    </div>
  );
};

const Total = (course) => {
  return (
    <p>
      Number of exercises{" "}
      {course.course.parts[0].exercise +
        course.course.parts[1].exercise +
        course.course.parts[2].exercise}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10,
      },
      {
        name: "Using props to pass data",
        exercise: 7,
      },
      {
        name: "State of a component",
        exercise: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
