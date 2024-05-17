"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface NavbarProps {
    onSubmit: (city: string) => void;
}

export const Navbar = ({ onSubmit }: NavbarProps) => {
    const [city, setCity] = useState<string>("");

    const handleSubmit = () => {
        const finalCity = city.trim();
        if (finalCity == "") return;
        setCity("");
        onSubmit(finalCity);
    }
    
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div className="flex justify-center">
            <ModeToggle />
            <div className="ml-2 flex w-full lg:max-w-md items-center">
                <SearchIcon className="absolute m-2 text-muted-foreground" />
                <Input
                    placeholder="Search your city"
                    onKeyDown={handleKeyDown}
                    className="w-full focus-visible:ring-transparent font-medium text-lg pl-10 mr-1"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <Button
                    value="Search"
                    onClick={handleSubmit}
                >
                    Search
                </Button>
            </div>
        </div>
    );
}