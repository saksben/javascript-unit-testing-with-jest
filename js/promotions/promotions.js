const {getDiscount} = require("./discount/discount");

function calculatePercentageDiscount(percentage, minimumSpend, currentPrice) {
    if (currentPrice >= minimumSpend) {
        const discount = 100 - percentage;
        return currentPrice * (discount / 100);
    }
    return currentPrice;
}

function calculateMoneyOff(discount, minimumSpend, currentPrice) {
    if (currentPrice >= minimumSpend) {
        return currentPrice  - discount;
    }
    return currentPrice;
}

function generateReferralCode(userId) {
    const id = Math.random().toString().substring(2, 5)

    return `#FRIEND-#${id}-#${userId}`; 
}

async function applyDiscount(discountCode, currentTotal) {
    const { data } = await getDiscount(discountCode);

    if (data.isValid) {
        switch(data.type) {
            case "MONEYOFF":
                return calculateMoneyOff(data.value,  data.minSpend, currentTotal);
            case "PERCENTAGEOFF":
                return calculatePercentageDiscount(data.value, data.minSpend, currentTotal);
        }
    }
    return currentTotal;
}

module.exports = {
    calculateMoneyOff,
    calculatePercentageDiscount,
    applyDiscount,
    generateReferralCode,
};