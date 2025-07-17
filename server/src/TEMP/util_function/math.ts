export const add = (a: number, b: number) => {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Arguments must be numbers");
    }
    return a + b;
};

export const divide = (a: number, b: number) => {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Arguments must be numbers");
    }
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
};
