const axios = require("axios");

async function getDiscount(code) {
    const response = await axios.get("/discount", {
        params: {
            code:code,
        }
    });
    return response;
}

module.exports = {
    getDiscount
}