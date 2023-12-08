export interface Job{
  student: string;
  _id:string
    subject: string;
  timeRange: string;
  description:string
    class: string;
    requests: {
      tutor: string;
      fee: string;
      date: Date;
    };
}