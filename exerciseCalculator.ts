interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  dailyExerciseHours: number[];
  targetAmount: number;
}

const parseInput = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const argsString = args.slice(2).join(' ');

  const arrayStringMatch = argsString.match(/\[(.*?)\]/);
  if (!arrayStringMatch) throw new Error('Could not parse the daily exercise hours array.');

  const arrayString = arrayStringMatch[1];
  const targetString = argsString.replace(arrayStringMatch[0], '').trim();
  
  const dailyExerciseHours = arrayString.split(',').map(arg => {
    const value = Number(arg.trim());
    if (isNaN(value)) {
      throw new Error('Provided hours are not valid numbers!');
    }
    return value;
  });

  const targetAmount = Number(targetString);
  if (isNaN(targetAmount)) {
    throw new Error('Provided target amount is not a number!');
  }

  return {
    dailyExerciseHours,
    targetAmount
  };
}

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): ExerciseResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  
  let totalHours = 0;
  dailyExerciseHours.forEach(hours => {
    totalHours += hours;
  });
  const average = totalHours / periodLength;
  const success = average >= targetAmount;

  let rating;
  let ratingDescription;

  if (average >= targetAmount) {
    rating = 3;
    ratingDescription = 'Good job!';
  } else if (average >= targetAmount * 0.5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Work harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  };
}

try {
  // Hard coded:
  // const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
  // const targetAmount = 2;
  const {dailyExerciseHours, targetAmount} = parseInput(process.argv);
  console.log(calculateExercises(dailyExerciseHours, targetAmount));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
