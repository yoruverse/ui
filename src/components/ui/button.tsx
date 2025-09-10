import * as React from "react";
import { cn } from "../../lib/cn";

type ButtonProps = React.ComponentProps<"button"> & {
	variant?: "primary" | "secondary";
	isIcon?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = "primary", isIcon, className, children, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(
					"flex items-center justify-center gap-2.5",
					"text-sm font-medium rounded-xl",
					variant === "primary" &&
						(props.disabled
							? "bg-disabled dark:text-disabled text-placeholder-subtle cursor-not-allowed"
							: "bg-brand-solid hover:bg-brand-solid-hover text-primary-on-brand"),
					variant === "secondary" &&
						(props.disabled
							? "bg-primary-alt border border-disabled dark:text-disabled text-placeholder-subtle cursor-not-allowed"
							: "bg-primary-alt hover:bg-secondary-hover text-primary border border-primary"),
					isIcon
						? "size-10 *:shrink-0 px-0 grow-0 aspect-square"
						: " h-10 px-5 w-fit",
					className,
				)}
				{...props}
			>
				{children}
			</button>
		);
	},
);
Button.displayName = "Button";

export { Button };
