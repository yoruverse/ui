import * as React from "react";
import { cn } from "@/lib/cn";

type SidebarProps = React.ComponentProps<"aside"> & {
	position?: "left" | "right";
	width?: "sm" | "md" | "lg";
};

type SidebarHeaderProps = React.ComponentProps<"div">;

type SidebarContentProps = React.ComponentProps<"div">;

type SidebarNavProps = React.ComponentProps<"nav">;

type SidebarNavListProps = React.ComponentProps<"ul">;

type SidebarNavItemProps = React.ComponentProps<"li">;

type SidebarNavLinkProps = React.ComponentProps<"a"> & {
	isActive?: boolean;
	indent?: number;
};

type SidebarNavGroupProps = React.ComponentProps<"div"> & {
	title?: string;
	collapsible?: boolean;
	defaultOpen?: boolean;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
	({ position = "left", width = "md", className, children, ...props }, ref) => (
		<aside
			ref={ref}
			className={cn(
				"flex flex-col overflow-hidden border-r border-primary",
				width === "sm" && "w-64",
				width === "md" && "w-72",
				width === "lg" && "w-80",
				position === "right" && "border-l border-r-0",
				className,
			)}
			{...props}
		>
			{children}
		</aside>
	),
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
	({ className, children, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex items-center gap-2.5 p-4", className)}
			{...props}
		>
			{children}
		</div>
	),
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
	({ className, children, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("flex-1 overflow-y-auto p-4", className)}
			{...props}
		>
			{children}
		</div>
	),
);
SidebarContent.displayName = "SidebarContent";

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
	({ className, children, ...props }, ref) => (
		<nav ref={ref} className={cn("space-y-10", className)} {...props}>
			{children}
		</nav>
	),
);
SidebarNav.displayName = "SidebarNav";

const SidebarNavList = React.forwardRef<HTMLUListElement, SidebarNavListProps>(
	({ className, children, ...props }, ref) => (
		<ul ref={ref} className={cn("list-none space-y-1", className)} {...props}>
			{children}
		</ul>
	),
);
SidebarNavList.displayName = "SidebarNavList";

const SidebarNavItem = React.forwardRef<HTMLLIElement, SidebarNavItemProps>(
	({ className, children, ...props }, ref) => (
		<li ref={ref} className={cn("", className)} {...props}>
			{children}
		</li>
	),
);
SidebarNavItem.displayName = "SidebarNavItem";

const SidebarNavLink = React.forwardRef<HTMLAnchorElement, SidebarNavLinkProps>(
	({ isActive = false, indent = 0, className, children, ...props }, ref) => (
		<a
			ref={ref}
			className={cn(
				"flex items-center px-3 py-1 text-sm font-medium rounded-lg transition-colors no-underline",
				"hover:text-fg-brand-secondary text-secondary",
				isActive && "text-fg-brand-secondary",
				indent > 0 && `ml-${indent * 4}`,
				className,
			)}
			{...props}
		>
			{children}
		</a>
	),
);
SidebarNavLink.displayName = "SidebarNavLink";

const SidebarNavGroup = React.forwardRef<HTMLDivElement, SidebarNavGroupProps>(
	(
		{
			title,
			collapsible = false,
			defaultOpen = true,
			className,
			children,
			...props
		},
		ref,
	) => {
		const [isOpen, setIsOpen] = React.useState(defaultOpen);

		const toggleOpen = () => {
			if (collapsible) {
				setIsOpen(!isOpen);
			}
		};

		return (
			<div ref={ref} className={cn("space-y-1", className)} {...props}>
				{title && (
					<button
						onClick={toggleOpen}
						className={cn(
							"flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-tertiary uppercase tracking-wider",
							collapsible && "hover:text-primary cursor-pointer",
							!collapsible && "cursor-default",
						)}
						aria-expanded={isOpen}
						type="button"
					>
						<span>{title}</span>
						{collapsible && (
							<span
								className={cn(
									"transition-transform",
									isOpen ? "rotate-90" : "rotate-0",
								)}
							>
								▶
							</span>
						)}
					</button>
				)}
				{(!collapsible || isOpen) && (
					<div className="space-y-1">{children}</div>
				)}
			</div>
		);
	},
);
SidebarNavGroup.displayName = "SidebarNavGroup";

export {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarNav,
	SidebarNavList,
	SidebarNavItem,
	SidebarNavLink,
	SidebarNavGroup,
};
