import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";

const buttonClasses = cva(
    "relative inline-flex items-center justify-center rounded-full px-6 py-2 text-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            intent: {
                primary: "bg-white text-black hover:bg-white/90 hover:shadow-glow transition-all duration-300",

                secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md",
                ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/5",
            },
            size: {
                sm: "text-sm px-4 py-1.5",
                md: "text-md px-6 py-2.5",
                lg: "text-lg px-8 py-3.5",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonClasses> {
    href?: string;
}

export const Button = ({ children, href, className, intent, size, ...props }: ButtonProps) => {
    const classes = classNames(buttonClasses({ intent, size, className }));

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};
