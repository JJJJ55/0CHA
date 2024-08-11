export interface Inbody {
  id?: number;
  userId?: number;
  height?: number;
  weight?: number;
  bodyWater?: number;
  protein?: number;
  mineral?: number;
  bodyFat?: number;
  muscleMass?: number;
  muscleBody?: number;
  muscleLeftArm?: number;
  muscleRightArm?: number;
  muscleLeftLeg?: number;
  muscleRightLeg?: number;
  bmi?: number;
  bodyFatPercent?: number;
  measuredAt?: string;
}

export interface FitnessDay {
  routineId: number;
  routineName: string;
  dueDate: string;
  completed: boolean;
}

export interface IsRoutine {
  btnName: string;
  isFlag: boolean;
  routineId: number;
}

export interface FitnessData {
  date: string;
  maxWeight: number;
  totalVolume: number;
  totalTime: number;
}
