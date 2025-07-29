import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Without this you can use basic matchers like:
// expect(element).toBe(something)
// expect(element).toEqual(something)
// expect(element).toBeTruthy()

// With jest-dom matchers we can also
// expect(element).toBeInTheDocument()
// expect(element).toHaveClass('active')
// expect(element).toBeVisible()
// expect(element).toHaveTextContent('Hi')

// Cleanup after each test
afterEach(() => {
	cleanup();
});
