const calculatorService = require("./services/calculatorService");

describe("Calculator Service Tests", () => {
  test("Should calculate total for Red and Green sets without discounts", () => {
    const items = { Red: 2, Green: 1 };
    const result = calculatorService.calculate(items, false);

    expect(result).toEqual({
      breakdown: [
        { item: "Red", quantity: 2, unitPrice: 50, discount: 0, total: 100 },
        { item: "Green", quantity: 1, unitPrice: 40, discount: 0, total: 40 },
      ],
      memberDiscount: 0,
      total: 140,
    });
  });

  test("Should apply 10% member discount", () => {
    const items = { Red: 2, Green: 1 };
    const result = calculatorService.calculate(items, true);

    expect(result).toEqual({
      breakdown: [
        { item: "Red", quantity: 2, unitPrice: 50, discount: 0, total: 100 },
        { item: "Green", quantity: 1, unitPrice: 40, discount: 0, total: 40 },
      ],
      memberDiscount: 14, // 10% of 140
      total: 126,
    });
  });

  test("Should apply bundle discount for pairs of Orange sets", () => {
    const items = { Orange: 4 };
    const result = calculatorService.calculate(items, false);

    expect(result).toEqual({
      breakdown: [
        {
          item: "Orange",
          quantity: 4,
          unitPrice: 120,
          discount: 24, // 2 pairs -> 5% per pair = 120 * 0.05 * 2
          total: 456, // (2 * 120 * 0.95)
        },
      ],
      memberDiscount: 0,
      total: 456,
    });
  });

  test("Should apply both bundle and member discounts", () => {
    const items = { Pink: 4, Green: 3 };
    const result = calculatorService.calculate(items, true);

    expect(result).toEqual({
      breakdown: [
        {
          item: "Pink",
          quantity: 4,
          unitPrice: 80,
          discount: 16, // 1 pair = 5% off 2 items
          total: 304, // 80 * 4 * 0.95
        },
        {
          item: "Green",
          quantity: 3,
          unitPrice: 40,
          discount: 4, // 1 pair = 5% off 2 items
          total: 116, // 40 * 2 * 0.95 + 40
        },
      ],
      memberDiscount: 42, // 10% of (304 + 116 = 420)
      total: 378,
    });
  });

  test("Should throw an error for invalid menu items", () => {
    const items = { Red: 1, InvalidItem: 2 };

    expect(() => calculatorService.calculate(items, false)).toThrow(
      'Oops! "InvalidItem" is not on the menu.'
    );
  });
});
