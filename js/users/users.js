class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.isPremium = false
    }
}
async function userExists(username) {
    const existingUsers = ["newuser1@pluralsight.com"]

    if (existingUsers.includes(username)) {
        return true;
    }
    return false;
}

function createUserId() {
    // Placeholder
    // Would call to DB
    return 2;
}

module.exports = {
    User,
    userExists,
    createUserId
}