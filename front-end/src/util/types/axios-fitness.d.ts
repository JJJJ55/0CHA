export interface FitnessType {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

export interface newRoutine {
  name: string;
  dueDate: string;
}

export interface Routine {
  title: string;
  dueDate: string;
  exercises: exercise[];
}

type exercise = {
  id: number;
  name: string;
  detail: detail[];
};

type detail = {
  id: number;
  set: number;
  weight: number;
  count: number;
  isComplete: boolean;
};

export interface RoutineList {
  id: number;
  title: string;
  dueDate: string;
  isLike: boolean;
}

export interface RoutineListDetailType {
  id: number;
  title: 'string';
  sumVolume: 'double';
  sumTime: 'int';
  createdAt: 'dateTime';
  completedAt: 'dateTime';
  dueDate: 'date';
  details: [
    {
      id: number;
      routineId: number;
      exerciseId: number;
      sequence: number;
      sets: [
        {
          id: number;
          routineDetailId: number;
          sequence: number;
          weight: number;
          count: number;
          set: number;
          complete: boolean;
        },
      ];
    },
  ];
  like: boolean;
  complete: boolean;
  upload: boolean;
}

export interface CreateRoutine {
  name: string;
  id: number;
}

export interface plan {
  name: string;
  id: number;
  detail: any[];
}

export interface ExerciseDetailType {
  id: number;
  set: number;
  weight: number | '';
  count: number | '';
  is_complete: boolean;
}
