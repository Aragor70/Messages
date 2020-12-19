
let users = [];



const addUser = (id, chat) => {
    
    
    //console.log(chat)
    const exists = users.filter(user => user.chat === chat && user.id === id)
    if (exists[0]) {
        return { error: 'User is connected already.' }
    }
    const user = { id, chat }

    users.push(user)
    //console.log(user)
    return user;
}

const removeUser = (id) => {
    
    users = users.filter(user => user.id !== id)
    //console.log(id)
    
}

const getUser = (id) => {
    //console.log(id)
    return users.filter(user => user.id === id)
}

const getUsers = (chat) => {
    console.log(users)
    return users.filter(user => user.chat === chat)
    
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsers
}