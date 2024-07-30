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

interface EntryProps {
  newDiary: NewDiary;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  diaryCreation: (event: React.SyntheticEvent) => void;
}

const EntryForm = ({ newDiary, handleChange, diaryCreation }: EntryProps) => (
  <form onSubmit={diaryCreation}>
    <div>
      date: <input type="date" name="date" value={newDiary.date} onChange={handleChange} required />
    </div>
    <div>
      visibility:
        <label>
          <input
            type="radio"
            name="visibility"
            value="great"
            checked={newDiary.visibility === 'great'}
            onChange={handleChange}
          />
          great
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="good"
            checked={newDiary.visibility === 'good'}
            onChange={handleChange}
          />
          good
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="ok"
            checked={newDiary.visibility === 'ok'}
            onChange={handleChange}
          />
          ok
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="poor"
            checked={newDiary.visibility === 'poor'}
            onChange={handleChange}
          />
          poor
        </label>
    </div>
    <div>
      weather:
        <label>
          <input
            type="radio"
            name="weather"
            value="sunny"
            checked={newDiary.weather === 'sunny'}
            onChange={handleChange}
          />
          sunny
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="rainy"
            checked={newDiary.weather === 'rainy'}
            onChange={handleChange}
          />
          rainy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="stormy"
            checked={newDiary.weather === 'stormy'}
            onChange={handleChange}
          />
          stormy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="cloudy"
            checked={newDiary.weather === 'cloudy'}
            onChange={handleChange}
          />
          cloudy
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="windy"
            checked={newDiary.weather === 'windy'}
            onChange={handleChange}
          />
          windy
        </label>
    </div>
    <div>
      comment: <input type="text" name="comment" value={newDiary.comment} onChange={handleChange} />
    </div>
    <button type="submit">add</button>
  </form>
)

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
      <EntryForm
        newDiary={newDiary}
        handleChange={handleChange}
        diaryCreation={diaryCreation}
      />
      <Header name={diaryHeader} />
      <Entries parts={diaries} />
    </div>
  );
};

export default App;