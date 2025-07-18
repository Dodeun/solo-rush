import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
	it("renders with correct text", () => {
		render(<Button>Click me</Button>);

		expect(screen.getByRole("button")).toHaveTextContent("Click me");
	});

	it("calls onClick when clicked", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick}>Click me</Button>);

		await user.click(screen.getByRole("button"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("is disabled when disabled prop is true", () => {
		render(<Button disabled>Disabled Button</Button>);

		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("applies correct variant class", () => {
		render(<Button variant="secondary">Secondary Button</Button>);

		expect(screen.getByRole("button")).toHaveClass("btn-secondary");
	});

	it("has correct test id", () => {
		render(<Button>Test Button</Button>);

		expect(screen.getByTestId("custom-button")).toBeInTheDocument();
	});
});
