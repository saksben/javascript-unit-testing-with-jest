const basket = require("../../js/basket/basket");
const { Event } = require("../../js/events/event");
const { BasketItem } = require("../../js/basket/basketitem");
let events = [];
let items = [];

// beforeAll(() => {
//   // Runs once before any tests have run
// });

// beforeEach(() => {
//   // Runs before every test
// });

// afterEach(() => {
//   // Runs after every test
// });

// afterAll(() => {
//   // Runs after all tests have run
// });

// describe() groups related test classes
describe("calculateTotal", () => {
  let events = [];
  let items = [];

  beforeEach(() => {
    events = [
      new Event(1, "A Night At The Proms", 2500.0, 2500, 2500),
      new Event(2, "Taylor Swift", 50.0, 5500, 2500),
      new Event(3, "Rage Against The Machine", 35.0, 2500, 2500),
    ];

    items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];
  });

  test("Test calculates total basket price when no discount applied", () => {
    const total = basket.calculateTotal(items);

    expect(total).toBeCloseTo(2770.0, 2);
  });

  test("Test calculates total basket price with discount", () => {
    const total = basket.calculateTotal(items, 800);

    expect(total).toBeCloseTo(1970.0, 2);
  });
});

describe("showAdverts", () => {
  test("Does not show adverts for premium users", () => {});

  test("Show adverts for non-premium users", () => {});
});
