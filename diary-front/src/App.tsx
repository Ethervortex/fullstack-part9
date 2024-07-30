import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const diaryHeader = "Diary entries";
  const newEntryHeader = "Add new entry";

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiary>({ date: '', visibility: '', weather: '', comment: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };
  
  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = await createDiary(newDiary);
      setDiaries(diaries.concat(data));
      setNewDiary({ date: '', visibility: '', weather: '', comment: '' });
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('Axios error:', error);
        console.log('Response data:', error.response.data);
        setError(error.response.data);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <Header name={newEntryHeader} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={diaryCreation}>
        <div>
          date: <input type="text" name="date" value={newDiary.date} onChange={handleChange} required />
        </div>
        <div>
          visibility: <input type="text" name="visibility" value={newDiary.visibility} onChange={handleChange} required />
        </div>
        <div>
          weather: <input type="text" name="weather" value={newDiary.weather} onChange={handleChange} required />
        </div>
        <div>
          comment: <input type="text" name="comment" value={newDiary.comment} onChange={handleChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <Header name={diaryHeader} />
      <Entries parts={diaries} />
    </div>
  );
};

export default App;