import { useState } from "react";

const Counter = ({ initialValue = 0, step = 1 }) => {
	const [count, setCount] = useState(initialValue);

	const increment = () => setCount(count + step);
	const decrement = () => setCount(count - step);
	const reset = () => setCount(initialValue);

	return (
		<div data-testid="counter">
			<p data-testid="count-value">Count: {count}</p>
			<button onClick={increment} data-testid="increment-btn">
				+{step}
			</button>
			<button onClick={decrement} data-testid="decrement-btn">
				-{step}
			</button>
			<button onClick={reset} data-testid="reset-btn">
				Reset
			</button>
		</div>
	);
};

export default Counter;
