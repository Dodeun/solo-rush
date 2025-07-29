import { add, divide } from "./math.js";

describe("Math utilities", () => {
    describe("add function", () => {
        it("should add two positive numbers correctly", () => {
            // Arrange
            const a = 5;
            const b = 3;

            // Act
            const result = add(a, b);

            // Assert
            expect(result).toBe(8);
        });

        it("should handle negative numbers", () => {
            expect(add(-5, 3)).toBe(-2);
            expect(add(-5, -3)).toBe(-8);
        });

        it("should throw error for non-numeric inputs", () => {
            // @ts-expect-error - Testing invalid input types
            expect(() => add("5", 3)).toThrow("Arguments must be numbers");
            // @ts-expect-error - Testing invalid input types
            expect(() => add(5, null)).toThrow("Arguments must be numbers");
        });
    });

    describe("divide function", () => {
        it("should divide two numbers correctly", () => {
            expect(divide(10, 2)).toBe(5);
            expect(divide(15, 3)).toBe(5);
        });

        it("should throw error when dividing by zero", () => {
            expect(() => divide(5, 0)).toThrow("Division by zero");
        });

        it("should throw error for non-numeric inputs", () => {
            // @ts-expect-error - Testing invalid input types
            expect(() => divide("12", 5)).toThrow("Arguments must be numbers");
            // @ts-expect-error - Testing invalid input types
            expect(() => divide(null, null)).toThrow(
                "Arguments must be numbers"
            );
        });
    });
});
