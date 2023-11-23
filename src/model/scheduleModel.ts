export interface Schedule {
    _id: string;
    tutor: string;
    timing: Array<{
      fee: number;
      date: Date;
      student: string;
    }>;
  }