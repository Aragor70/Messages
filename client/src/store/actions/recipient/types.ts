export const Get_Recipient = 'Get_Recipient';
export const Get_Recipients = 'Get_Recipients';
export const Get_About = 'Get_About';


export type RecipientType = {
    name?: string | null,
    email: string | null,
    avatar?: string | null,
    role?: string | null
}