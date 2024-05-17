import { LucideIcon } from "lucide-react";

interface ItemProps {
    icon: LucideIcon;
    title: string;
    value: string;
}

export const Item = ({
    icon: Icon,
    title,
    value
}: ItemProps) => {
    return (
        <div className="flex items-center text-xl">
            <Icon className="h-6 w-6 mr-1" />
            {title} : {value}
        </div>
    );
}