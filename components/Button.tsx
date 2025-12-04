import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "accent";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className,
    type = "button",
}: ButtonProps) {
    const baseStyles = "inline-block text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] font-medium";

    const variantStyles = {
        primary: "bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)]",
        secondary: "bg-transparent text-[#2D6DF6] border-2 border-[#2D6DF6] hover:bg-[#2D6DF6] hover:text-white hover:-translate-y-0.5",
        accent: "bg-[#00B894] text-white hover:bg-[#009874] hover:-translate-y-0.5",
    };

    const sizeStyles = {
        sm: "py-2 px-5 text-sm",
        md: "py-3 px-6 text-base",
        lg: "py-4 px-8 text-lg",
    };

    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
