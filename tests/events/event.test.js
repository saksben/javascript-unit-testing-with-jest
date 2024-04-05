const { InvalidEventNameError } = require("../../js/error-handling/exceptions");
const { Event, getTagLine, createEvent } = require("../../js/events/event");

test("Returns Sold Out tagline when no tickets left", () => {
  const event = new Event(1, "Summer BBQ", 40.0, 100, 0);
  const tagLine = getTagLine(event, 10, true);

  expect(tagLine).toBe("Event Sold Out!");
});

// Error handling
describe("createEvent", () => {
  test("Throws error when name is not a string", () => {
    // expect(() => createEvent(1, 25.0, 200)).toThrow();
    // expect(() => createEvent(1, 25.0, 200)).toThrow(/Event name/);
    // expect(() => createEvent(1, 25.0, 200)).toThrow(InvalidEventNameError);
    expect(() => createEvent(1, 25.0, 200)).toThrow(
      new InvalidEventNameError("Event name cannot exceed 200 characters")
    );
  });

  test("Throws error when name exceeds limit", () => {
    const name = "longEventName".repeat(20).substring(0, 201);
    expect(() => createEvent(name, 25.0, 200)).toThrow(
      new InvalidEventNameError("Event name cannot exceed 200 characters")
    );
  });
});
