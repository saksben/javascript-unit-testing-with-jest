const users = require("../../js/users/users");
const account = require("../../js/users/account/account");
const purchaseHistory = require("../../js/users/account/purchaseHistory/purchaseHistory");
jest.mock("../../js/users/account/purchaseHistory/purchaseHistory");

describe("getPastPurchases", () => {
  test("Test gets past purchase history", () => {
    const userId = 123;
    const items = account.getPastPurchases(userId);
    expect(items).toEqual([
      {
        name: "Punk Goes Pop - 90s",
        tickets: 2,
        price: 40.0,
      },
      {
        name: "Adventures Live!",
        tickets: 5,
        price: 120.0,
      },
      {
        name: "Folk dance party!",
        tickets: 3,
        price: 75.0,
      },
    ]);
  });

  test("Throws error when readyState is not 4", () => {
    jest.spyOn(purchaseHistory, "getPurchaseHistory").mockReturnValue({
      readyState: 2,
      onreadystatechange: null,
      response: {
        events: [],
      },
    });
    expect(() => account.getPastPurchases(123)).toThrow(
      "Failed to get purchase history"
    );
  });
});

// Use promises to test async code
describe("createAccount", () => {
  let newEmailAddress = "newuser2@pluralsight.com";
  beforeEach(() => {
    jest.spyOn(users, "userExists").mockResolvedValue(false);
    jest.spyOn(users, "createUserId").mockReturnValue(2);
  });

  test("Returns user data when account created successfully", () => {
    expect.hasAssertions();

    return account.createAccount(newEmailAddress).then((userAccount) => {
      expect(userAccount).toStrictEqual({
        data: { userId: 2, username: newEmailAddress },
      });
    });
  });

  test("Returns user data when account created successfully - async/await", async () => {
    expect.hasAssertions();

    const userAccount = await account.createAccount(newEmailAddress);

    expect(userAccount).toStrictEqual({
      data: { userId: 2, username: newEmailAddress },
    });
  });

  test("Returns user data when account created successfully - resolves", () => {
    expect.hasAssertions();

    expect(account.createAccount(newEmailAddress)).resolves.toStrictEqual({
      data: { userId: 2, username: newEmailAddress },
    });
  });

  test("Returns error message when user already exists", () => {
    jest.spyOn(users, "userExists").mockReturnValue(true);
    expect.hasAssertions();
    return expect(account.createAccount(newEmailAddress)).rejects.toStrictEqual(
      "User already exists"
    );
  });

  test("Returns error message when user already exists - async/await", async () => {
    jest.spyOn(users, "userExists").mockReturnValue(true);
    expect.hasAssertions();
    await expect(account.createAccount(newEmailAddress)).rejects.toStrictEqual(
      "User already exists"
    );
  });
});
