import { NewPatientEntry, Gender, NewEntry, HealthCheckRating, Diagnosis } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string');
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (gender: unknown): gender is Gender => {
  return typeof gender === 'string' && Object.values(Gender).includes(gender as Gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const isRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param  as HealthCheckRating);
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const isDiagnosisCodeArray = (array: unknown): array is Array<Diagnosis['code']> => {
  return Array.isArray(array) && array.every(code => isString(code));
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes || !isDiagnosisCodeArray(codes)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + codes);
  }
  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  //if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object) {
  const base = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };

  switch (object.type) {
    case "HealthCheck":
      return {
        ...base,
        type: "HealthCheck",
        healthCheckRating: parseRating(object.healthCheckRating)
      };
    case "Hospital":
      return {
        ...base,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria)
        }
      };
    case "OccupationalHealthcare":
      return {
        ...base,
        type: "OccupationalHealthcare",
        employerName: parseString(object.employerName),
        sickLeave: object.sickLeave ? {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        } : undefined
      };
    default:
      throw new Error('Incorrect or missing entry type');
  }
//  }
};