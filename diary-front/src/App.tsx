import { useState, useEffect } from 'react';
import { Diary, NewDiary } from "./types";
import { getAllDiaries, createDiary } from './diaryService';

const Header = ({ name }: { name: string }) => (
  <h2>{name}</h2>
);

const Entries = ({ parts }: { parts: Diary[] }) => (
  <div>
    {parts.map((part, index) => (
      <div key={index}>
        <h3>{part.date}</h3>
        <p>visibility: {part.visibility}</p>
        <p>weather: {part.weather}</p>
      </div>
    ))}
  </div>
);

const App = () => {
  const diaryHeader = "Diary entries"

  const [diaries, setDiaries] = useState<Diary[]>([]);
  
  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <Header name={diaryHeader} />
      <Entries parts={diaries} />
    </div>
  );
};

export default App;