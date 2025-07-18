import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	variant?: "primary" | "secondary";
}

export const Button = ({
	children,
	onClick,
	disabled = false,
	variant = "primary",
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`btn btn-${variant}`}
			data-testid="custom-button"
		>
			{children}
		</button>
	);
};
