interface Course {
  name: string,
  exerciseCount: number
}

const Header = ({ name }: { name: string }) => (
  <h1>{name}</h1>
);

const Content = ({ parts }: { parts: Course[] }) => (
  <div>
    {parts.map((part, index) => (
      <p key={index}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
  </div>
);

const Total = ({ total }: { total: number }) => (
  <p>
    Number of exercises {total}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
