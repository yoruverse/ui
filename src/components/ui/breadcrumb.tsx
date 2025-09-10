import * as React from "react";
import { cn } from "@/lib/cn";

type BreadcrumbProps = React.ComponentProps<"nav"> & {
	separator?: React.ReactNode;
};

type BreadcrumbListProps = React.ComponentProps<"ol">;

type BreadcrumbItemProps = React.ComponentProps<"li">;

type BreadcrumbLinkProps = React.ComponentProps<"a"> & {
	asChild?: boolean;
};

type BreadcrumbPageProps = React.ComponentProps<"span">;

type BreadcrumbSeparatorProps = React.ComponentProps<"li">;

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
	({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />,
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
	({ className, ...props }, ref) => (
		<ol
			ref={ref}
			className={cn(
				"p-0 flex flex-wrap items-center gap-1.5 break-words text-sm list-none!",
				className,
			)}
			{...props}
		/>
	),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
	({ className, ...props }, ref) => (
		<li
			ref={ref}
			className={cn("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
	({ className, ...props }, ref) => (
		<a
			ref={ref}
			className={cn(
				"transition-colors text-secondary hover:text-primary rounded-sm no-underline hover:underline",
				className,
			)}
			{...props}
		/>
	),
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
	({ className, ...props }, ref) => (
		<span
			ref={ref}
			aria-current="page"
			className={cn("font-medium text-primary", className)}
			{...props}
		/>
	),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
	children,
	className,
	...props
}: BreadcrumbSeparatorProps) => (
	<li
		role="presentation"
		aria-hidden="true"
		className={cn("text-secondary", className)}
		{...props}
	>
		{children ?? ">"}
	</li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
};
