const { generateReferralCode } = require("../../js/promotions/promotions");

describe("generateReferralCode", () => {
  test("Referral code contains userId", () => {
    const userId = "1234";
    const referralCode = generateReferralCode(userId);

    // Check if an array or iterable contains a particular item or value
    expect(referralCode).toContain(userId);
    // Check if a string matches a regular expression or includes a substring
    expect(referralCode).toMatch(userId);
  });

  test("Referral code has correct format", () => {
    const userId = "1234";
    const referralCode = generateReferralCode(userId);

    expect(referralCode).toMatch(/#FRIEND-#\d+-#1234/);
  });
});
