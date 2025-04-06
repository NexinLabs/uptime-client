type LabelVariant = "default" | "primary" | "secondary" | "light";

const variants: Record<LabelVariant, string> = {
    "default": "bg-black border-emerald-500 text-white",
    "primary": "bg-emerald-500 text-white", 
    "secondary": "bg-gray-500 text-white",
    "light": "bg-white text-black"
}

interface TopLabelProps {
    text: string;
    variant?: LabelVariant;
    className?: string;
}

function TopLabel({ text, variant = "default", className = "" }: TopLabelProps) {
    return (
        <span className={`${variants[variant]} absolute top-[-15px] px-2 ml-6 border rounded-lg ${className}`}>
            {text}
        </span>
    );
}

export default TopLabel;