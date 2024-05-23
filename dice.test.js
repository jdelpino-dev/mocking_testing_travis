import rollDice from "./dice.js";

describe("#rollDice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("it rolls the correct number of sides and values", () => {
    const separation = 1 / 6;
    for (let i = 0; i <= 5; i++) {
      Math.random = jest.fn(() => i * separation);
      expect(rollDice(6)).toBe(i + 1);
      expect(Math.random).toHaveBeenCalledTimes(1);
    }
    expect(Math.random).toHaveBeenCalledWith();
  });

  test("it calls Math.random for each roll", () => {
    Math.random = jest.fn(() => 0.5);
    rollDice(6);
    expect(Math.random).toHaveBeenCalledTimes(1);
    rollDice(6);
    expect(Math.random).toHaveBeenCalledTimes(2);
    rollDice(6);
    expect(Math.random).toHaveBeenCalledTimes(3);
  });

  test("it works with different number of sides", () => {
    Math.random = jest.fn(() => 0.5);
    expect(rollDice(4)).toBe(3); // (0.5 * 4) + 1 = 3
    expect(rollDice(10)).toBe(6); // (0.5 * 10) + 1 = 6
    expect(rollDice(20)).toBe(11); // (0.5 * 20) + 1 = 11
  });

  test("it always returns a value within the correct range", () => {
    for (let i = 0; i < 1000; i++) {
      const numSides = 6;
      const result = rollDice(numSides);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(numSides);
    }
  });

  test("it handles boundary values of Math.random()", () => {
    Math.random = jest.fn(() => 0.999999);
    expect(rollDice(6)).toBe(6); // maximum value
    Math.random = jest.fn(() => 0.0);
    expect(rollDice(6)).toBe(1); // minimum value
    Math.random = jest.fn(() => 1 / 6 - 0.0000000001);
    expect(rollDice(6)).toBe(1); // minimum value
    Math.random = jest.fn(() => 1 / 6 + 0.0000000001);
    expect(rollDice(6)).toBe(2); // maximum value
  });

  test("it handles invalid inputs gracefully", () => {
    expect(() => rollDice(0)).toThrow();
    expect(() => rollDice(-1)).toThrow();
    expect(() => rollDice(NaN)).toThrow();
    expect(() => rollDice(undefined)).toThrow();
    expect(() => rollDice(null)).toThrow();
  });
});
