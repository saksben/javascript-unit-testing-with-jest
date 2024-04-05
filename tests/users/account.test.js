const users = require("../../js/users/users");
const account = require("../../js/users/account/account");
const purchaseHistory = require("../../js/users/account/purchaseHistory/purchaseHistory")
jest.unmock("../../js/users/account/account");

describe("getPastPurchases", () => {
    test("Test gets past purchase history", () => {
        const userId = 123;
        const items = account.getPastPurchases(userId);
        expect(items).toEqual([
            {
                name: "Punk Goes Pop - 90s",
                tickets: 2,
                price: 40.00,
            },
            {
                name: "Adventures Live!",
                tickets: 5,
                price: 120.00,       
            },
            {
                name: "Folk dance party!",
                tickets: 3,
                price: 75.00,
            }
        ]);
    });

    test("Throws error when readyState is not 4", () => {
        jest.spyOn(purchaseHistory, 'getPurchaseHistory').mockReturnValue({
            readyState: 2,        
            onreadystatechange: null,
            response: {
                events: [
                ],
            }   
        });
        expect(() => account.getPastPurchases(123)).toThrow("Failed to get purchase history");
    })
});