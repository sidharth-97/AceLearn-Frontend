export interface Schedule {
    _id: string;
    tutor: string;
  timing: Array<{
      _id:string
      fee: number;
      date: Date;
      student: string;
    }>;
  }