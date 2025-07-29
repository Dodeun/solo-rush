import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
	it("should render with initial value", () => {
		// Arrange & Act
		render(<Counter initialValue={5} />);

		// Assert
		expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 5");
	});

	it("should increment count when increment button is clicked", () => {
		// Arrange
		render(<Counter initialValue={0} step={2} />);

		// Act
		fireEvent.click(screen.getByTestId("increment-btn"));

		// Assert
		expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 2");
	});

	it("should decrement count when decrement button is clicked", () => {
		// Arrange
		render(<Counter initialValue={10} step={3} />);

		// Act
		fireEvent.click(screen.getByTestId("decrement-btn"));

		// Assert
		expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 7");
	});

	it("should reset count to initial value when reset button is clicked", () => {
		// Arrange
		render(<Counter initialValue={5} />);

		// Act
		fireEvent.click(screen.getByTestId("increment-btn"));
		fireEvent.click(screen.getByTestId("reset-btn"));

		// Assert
		expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 5");
	});

	it("should handle multiple increments correctly", () => {
		// Arrange
		render(<Counter initialValue={0} step={1} />);

		// Act
		fireEvent.click(screen.getByTestId("increment-btn"));
		fireEvent.click(screen.getByTestId("increment-btn"));
		fireEvent.click(screen.getByTestId("increment-btn"));

		// Assert
		expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 3");
	});
});
