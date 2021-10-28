const ErrorResponse = require("./errorResponse");

let users = [];



const addUser = (id, socketId, chat) => {
    
    
    const exists = users.filter(user => user.chat === chat && user.id === id)[0]
    if (exists) {
        return new ErrorResponse('User already exists.', 401)
    }
    const user = { id, socketId, chat }

    users.push(user)
    
    return user;
}

const removeUser = (id) => {
    
    return users = users.filter(user => user.id !== id)
    
}

const getUser = (id) => {
    
    return users.filter(user => user.id === id)
}

const getUsers = (chat) => {
    
    return users.filter(user => user.chat === chat)
    
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsers
}