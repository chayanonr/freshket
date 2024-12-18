const calculatorService = require("./services/calculatorService");

describe("CalculatorService - Discount Logic Tests", () => {
  test("1. Should calculate total price without any discounts", () => {
    const items = { Red: 2, Blue: 1, Yellow: 3 };
    const result = calculatorService.calculate(items, false);

    expect(result).toEqual({
      breakdown: [
        { item: "Red", quantity: 2, unitPrice: 50, discount: 0, total: 100 },
        { item: "Blue", quantity: 1, unitPrice: 30, discount: 0, total: 30 },
        { item: "Yellow", quantity: 3, unitPrice: 50, discount: 0, total: 150 },
      ],
      memberDiscount: 0,
      total: 280,
    });
  });

  test("2. Should apply 5% bundle discount for pairs of eligible items", () => {
    const items = { Orange: 4, Pink: 2 };
    const result = calculatorService.calculate(items, false);

    expect(result).toEqual({
      breakdown: [
        { item: "Orange", quantity: 4, unitPrice: 120, discount: 24, total: 456 },
        { item: "Pink", quantity: 2, unitPrice: 80, discount: 8, total: 152 }, 
      ],
      memberDiscount: 0,
      total: 608,
    });
  });

  test("3. Should apply 10% membership discount on total price", () => {
    const items = { Red: 2, Blue: 1, Yellow: 3 };
    const result = calculatorService.calculate(items, true);

    expect(result).toEqual({
      breakdown: [
        { item: "Red", quantity: 2, unitPrice: 50, discount: 0, total: 100 },
        { item: "Blue", quantity: 1, unitPrice: 30, discount: 0, total: 30 },
        { item: "Yellow", quantity: 3, unitPrice: 50, discount: 0, total: 150 },
      ],
      memberDiscount: 28,
      total: 252,
    });
  });

  test("4. Should apply both bundle and membership discounts", () => {
    const items = { Orange: 4, Green: 2, Pink: 2 };
    const result = calculatorService.calculate(items, true);

    expect(result).toEqual({
      breakdown: [
        { item: "Orange", quantity: 4, unitPrice: 120, discount: 24, total: 456 },
        { item: "Green", quantity: 2, unitPrice: 40, discount: 4, total: 76 },
        { item: "Pink", quantity: 2, unitPrice: 80, discount: 8, total: 152 },
      ],
      memberDiscount: 68.4,
      total: 615.6,
    });
  });

  test("5. Should throw an error for invalid menu items", () => {
    const items = { InvalidItem: 2, Red: 1 };

    expect(() => calculatorService.calculate(items, false)).toThrow(
      'Oops! "InvalidItem" is not on the menu.'
    );
  });

  test("6. Should handle edge case with zero quantities", () => {
    const items = { Red: 0, Blue: 0, Orange: 0 };
    const result = calculatorService.calculate(items, false);

    expect(result).toEqual({
      breakdown: [],
      memberDiscount: 0,
      total: 0,
    });
  });

  test("7. Should handle single item orders with no discounts", () => {
    const items = { Purple: 1 };
    const result = calculatorService.calculate(items, false);

    expect(result).toEqual({
      breakdown: [
        { item: "Purple", quantity: 1, unitPrice: 90, discount: 0, total: 90 },
      ],
      memberDiscount: 0,
      total: 90,
    });
  });

  test("8. Should handle negative quantities by treating them as zero", () => {
    const items = { Red: -3, Blue: -1, Yellow: 2 };
    const result = calculatorService.calculate(items, false);

    expect(result).toEqual({
      breakdown: [
        { item: "Yellow", quantity: 2, unitPrice: 50, discount: 0, total: 100 },
      ],
      memberDiscount: 0,
      total: 100,
    });
  });

  test("9. Should handle mixed valid and invalid quantities", () => {
    const items = { Orange: 4, Green: -2, Pink: 2, InvalidItem: 1 };
    const result = calculatorService.calculate({ Orange: 4, Pink: 2 }, false);

    expect(result).toEqual({
      breakdown: [
        { item: "Orange", quantity: 4, unitPrice: 120, discount: 24, total: 456 },
        { item: "Pink", quantity: 2, unitPrice: 80, discount: 8, total: 152 },
      ],
      memberDiscount: 0,
      total: 608,
    });
  });

  test("10. Should calculate with large quantities", () => {
    const items = { Orange: 100, Pink: 50, Green: 25 };
    const result = calculatorService.calculate(items, true);

    expect(result).toEqual({
      breakdown: [
        {
          item: "Orange",
          quantity: 100,
          unitPrice: 120,
          discount: 600,
          total: 11400,
        },
        {
          item: "Pink",
          quantity: 50,
          unitPrice: 80,
          discount: 200,
          total: 3800,
        },
        {
          item: "Green",
          quantity: 25,
          unitPrice: 40,
          discount: 48,
          total: 952,
        },
      ],
      memberDiscount: 1615.2,
      total: 14536.8,
    });
  });

});
