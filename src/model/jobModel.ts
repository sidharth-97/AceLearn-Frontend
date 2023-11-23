export interface Job{
    student: string;
    subject: string;
    timeRange: string;
    class: string;
    requests: {
      tutor: string;
      fee: string;
      date: Date;
    };
}