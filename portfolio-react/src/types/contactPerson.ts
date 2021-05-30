
export interface IContactPerson{
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    message?: string
}

export interface IContactState{
    contactSubmitting: boolean,
    contactSuccess: boolean,
    contactError: boolean | string
}