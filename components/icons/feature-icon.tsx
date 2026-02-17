import classNames from "classnames";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
    icon: LucideIcon;
    variant?: "primary" | "secondary" | "accent";
    className?: string;
}

export const FeatureIcon = ({
    icon: Icon,
    variant = "primary",
    className,
}: FeatureIconProps) => {
    const colorMap = {
        primary: "text-[#6663F6]", // Linear purple
        secondary: "text-[#4A7BF7]", // Blue
        accent: "text-[#D4D4D8]", // White/Grey
    };

    const gradientMap = {
        primary: "from-[#6663F6]/20 to-transparent",
        secondary: "from-[#4A7BF7]/20 to-transparent",
        accent: "from-[#D4D4D8]/10 to-transparent",
    };

    return (
        <div
            className={classNames(
                "relative flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5",
                className
            )}
        >
            <div
                className={classNames(
                    "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-50 blur-xl",
                    gradientMap[variant]
                )}
            />
            <Icon className={classNames("h-10 w-10 md:h-12 md:w-12", colorMap[variant])} />
        </div>
    );
};
