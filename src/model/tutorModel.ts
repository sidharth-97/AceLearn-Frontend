export interface Tutor{
    _id: string,
    email: string,
    name:string,
    password: string,
    mobile: string,
    subject: Array<string>,
    fee: string,
    bio: string,
    image:string,
    isBlocked: Boolean,
    wallet: number,
    review: object,
    qualifications: string,
    notifications: Array<object>
    rating:number
}