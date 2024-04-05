const exception = require("../../error-handling/exceptions")
const purchaseHistory = require("./purchaseHistory/purchaseHistory")
const users = require("../users")

class Purchase {
    constructor(eventName, tickets, cost) {
        this.eventName = eventName;
        this.tickets = tickets;
        this.cost = cost;
    }
}

async function isValidUserName(userName) {
    // Placeholder for request checking if username is valid
    if (!userName || !userName.includes('@')) {
        return false;
    }
    else{
        return true;
    }
}

async function createAccount(username) {
    if (!isValidUserName(username)) {
        throw exception.InvalidUsernameError("Please enter a valid username")
    }
    const userExists = await users.userExists(username);
    return new Promise((resolve, reject) => {
        if (!userExists) {
            resolve({data: {
                "userId": users.createUserId(),
                "username": username,
            }}) 
        } else {
            reject("User already exists")
        }
       
    })
}

function getPastPurchases(userId) {
    const purchases = purchaseHistory.getPurchaseHistory(userId);
        if (purchases.readyState === 4) {
            return purchases.response.events;
        }
        else {
            throw Error("Failed to get purchase history");
        }
}

module.exports = {
    Purchase,
    createAccount,
    isValidUserName,
    getPastPurchases
}