import { describe, it, expect } from "vitest";
import { mathUtils } from "./math";

describe("Math utilities", () => {
	describe("add", () => {
		it("adds two positive numbers", () => {
			expect(mathUtils.add(2, 3)).toBe(5);
		});

		it("adds negative numbers", () => {
			expect(mathUtils.add(-2, -3)).toBe(-5);
		});

		it("adds zero", () => {
			expect(mathUtils.add(5, 0)).toBe(5);
		});
	});

	describe("multiply", () => {
		it("multiplies two numbers", () => {
			expect(mathUtils.multiply(4, 5)).toBe(20);
		});

		it("multiplies by zero", () => {
			expect(mathUtils.multiply(5, 0)).toBe(0);
		});
	});

	describe("isEven", () => {
		it("returns true for even numbers", () => {
			expect(mathUtils.isEven(4)).toBe(true);
			expect(mathUtils.isEven(0)).toBe(true);
		});

		it("returns false for odd numbers", () => {
			expect(mathUtils.isEven(3)).toBe(false);
			expect(mathUtils.isEven(1)).toBe(false);
		});
	});
});
