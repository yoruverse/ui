import { cn } from "@/lib/cn";

type ComponentSnippetProps = React.HTMLAttributes<HTMLDivElement>;

export function ComponentSnippet({
	className,
	children,
}: ComponentSnippetProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-5 p-5 items-center justify-center min-h-72 w-full",
				"border border-primary rounded-2xl bg-primary",
				className,
			)}
		>
			{children}
		</div>
	);
}
