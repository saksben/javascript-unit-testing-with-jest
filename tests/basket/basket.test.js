const basket = require("../../js/basket/basket");
const { Event } = require("../../js/events/event");
const { BasketItem } = require("../../js/basket/basketitem");
const { User } = require("../../js/users/users");

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
  test("Does not show adverts for premium users", () => {
    let user = new User(1, "Test User");
    user.isPremium = true;

    expect(basket.showAdverts(user)).toBe(false);
    // expect(basket.showAdverts(user)).not.toBe(false);
  });

  test("Show adverts for non-premium users", () => {
    let user = new User(1, "Test User");

    expect(basket.showAdverts(user)).toBe(true);
  });
});

describe("serializeBasketItemsToJson", () => {
  test("Basket items are serialized correctly", () => {
    const events = [
      new Event(1, "A Night At The Proms", 2500.0, 2500, 2500),
      new Event(3, "Raging Machine", 35.0, 2500, 2500),
    ];

    const items = [new BasketItem(events[0], 1), new BasketItem(events[1], 2)];

    itemsSerializedToJson = [
      {
        event: {
          id: 1,
          name: "A Night At The Proms",
          ticketPrice: 2500.0,
          totalTickets: 2500,
          ticketsRemaining: 2500,
        },
        ticketCount: 1,
      },
      {
        event: {
          id: 3,
          name: "Raging Machine",
          ticketPrice: 35.0,
          totalTickets: 2500,
          ticketsRemaining: 2500,
        },
        ticketCount: 2,
      },
    ];

    const serializedItems = basket.serializeBasketItemsToJson(items);

    // not.toBe is to check that it isn't {something}
    // expect(serializedItems).not.toBe(itemsSerializedToJson);

    // toEqual is for comparing properties (ex. Object vs class), toBe is for strict equality (ex. Object vs Object)
    expect(serializedItems).toEqual(itemsSerializedToJson);

    // toStrictEqual recursively checks deep equality of the data structure fields
    // expect(serializedItems).toStrictEqual(itemsSerializedToJson);
  });
});

describe("searchBasket", () => {
  test("Only returns events that match the search query", () => {
    const events = [
      new Event(1, "The Movie Premiere", 2500.0, 2500, 2500),
      new Event(2, "Rock n Roll night", 50.0, 5500, 2500),
      new Event(3, "The Raging Machine", 35.0, 2500, 2500),
    ];

    const items = [
      new BasketItem(events[0], 1),
      new BasketItem(events[1], 4),
      new BasketItem(events[2], 2),
    ];

    const foundItems = basket.searchBasket(items, "THE");

    expect(foundItems).toContain(items[0]);
    expect(foundItems).toContain(items[2]);

    expect(foundItems).not.toContain(items[1]);
  });
});

describe("getBasketItem", () => {
  let events = [];
  let items = [];
  beforeEach(() => {
    events = [
      new Event(1, "A Night At The Proms", 2500.0, 2500, 2500),
      new Event(2, "Raging Machine", 35.0, 2500, 2500),
    ];
    items = [new BasketItem(events[0], 1), new BasketItem(events[1], 2)];
  });

  test("returns truthy if event exists in the basket", () => {
    const basketItem = basket.getBasketItem(items, events[0]);

    // toBeTruthy passes if value is truthy
    expect(basketItem).toBeTruthy();

    expect(basketItem).not.toBeNull();
  });

  test("Returns falsy if event does not exist in the basket", () => {
    const basketItem = basket.getBasketItem(
      items,
      new Event(3, "Pop party!", 10.0, 25, 25)
    );

    // toBeFalsy passes if it receives any of the 6 falsy values
    expect(basketItem).toBeFalsy();

    expect(basketItem).toBeNull();
  });
});
