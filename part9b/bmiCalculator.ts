export interface BmiValues {
  value1: number;
  value2: number;
}
  
export const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const bmiCategory = (bmi: number): string => {
  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi >= 16.0 && bmi < 17.0) return 'Underweight (Moderate thinness)';
  if (bmi >= 17.0 && bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi >= 18.5 && bmi < 25.0) return 'Normal (healthy weight)';
  if (bmi >= 25.0 && bmi < 30.0) return 'Overweight (Pre-obese)';
  if (bmi >= 30.0 && bmi < 35.0) return 'Obese (Class I)';
  if (bmi >= 35.0 && bmi < 40.0) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height/100 * height/100);
  return bmiCategory(bmi);
};

if (require.main === module) {
  try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
