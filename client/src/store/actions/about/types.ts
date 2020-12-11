export const Get_About_Me = 'Get_About_Me';
export const Remove_About = 'Remove_About';
export const Update_About = 'Update_About';

export type AboutType = {
    age: Date | null,
    gender: string | null,
    status: string | null,
    social:{
        youtube: string | null,
        twitter: string | null,
        facebook: string | null,
        linkedin: string | null,
        instagram: string | null
    }
};

export type AboutReducerType = {
    about: AboutType,
    loading: true | false,
    errors: any
}


export type GetAbout = {
    type: typeof Get_About_Me,
    payload: AboutType
}
export type UpdateAbout = {
    type: typeof Update_About,
    payload: AboutType
}

  
export type AboutDispatchTypes = GetAbout | UpdateAbout