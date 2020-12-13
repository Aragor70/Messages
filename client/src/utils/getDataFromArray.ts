export const getNotEqual = (array: any[], given: string) => {

    if(array && given) {
        return array.filter((element:any) => element !== given)[0]
    } else {
        return null
    }
}

export const ifExists = (array: any[], given: any) => {

    if(array && given) {
        return !!array.filter((element:any) => element._id === given._id.toString())[0]
    } else {
        return false
    }
}