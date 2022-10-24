const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Total of {sum} exercises</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((a, b) => a + b.exercises, 0)} />
  </>
);

const Courses = ({ courses }) => (
  <>
    <Header course="Web development curriculum" />
    {courses.map((course) => (
      <Course key={course.id} course={course} />
    ))}
  </>
);

export default Courses;