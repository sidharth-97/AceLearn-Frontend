export interface Schedule{
    _id: string,
    tutor: string,
    timing: [{
        fee: number,
        date: Date,
        student:string
    }]
}