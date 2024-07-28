export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseValues {
  dailyExerciseHours: number[];
  targetAmount: number;
}

export const parseInput = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetAmount = Number(args[2]);
  if (isNaN(targetAmount)) {
    throw new Error('Provided target was not a number!');
  }

  const dailyExerciseHours = args.slice(3).map(arg => {
    const value = Number(arg);
    if (isNaN(value)) {
      throw new Error('Provided exercise hours are not valid numbers!');
    }
    return value;
  });

  return {
    dailyExerciseHours,
    targetAmount
  };
};

export const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): ExerciseResult => {
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
};

if (require.main === module) {
  try {
    // Hard coded:
    // const dailyExerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
    // const targetAmount = 2;
    const {dailyExerciseHours, targetAmount} = parseInput(process.argv);
    console.log(calculateExercises(dailyExerciseHours, targetAmount));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
