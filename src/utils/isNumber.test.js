import isNumber from "./isNumber";

describe("isNumber basic functionality", () => {
  it("returns true for number and numbers in strings", () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber("123")).toBe(true);
    expect(isNumber("123.123")).toBe(true);
    expect(isNumber("123.123.123")).toBe(false);
    expect(isNumber("abc")).toBe(false);
  });

  it("returns false for not numbers and string numbers", () => {
    expect(isNumber({})).toBe(false);
    expect(isNumber(() => foo)).toBe(false);
    expect(isNumber("123" + 123)).toBe(true);
  });
});
