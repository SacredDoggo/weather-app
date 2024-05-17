"use client";

import { TodaysView } from "@/lib/interfaces"
import Image from "next/image";
import { useEffect } from "react";
import { Item } from "./item";
import { CloudFogIcon, CloudLightningIcon, CloudRainIcon, CloudRainWindIcon, CloudSnowIcon, CloudSunIcon, DropletsIcon, LucideIcon, MapPinIcon, SunIcon, ThermometerIcon, ThermometerSnowflakeIcon, ThermometerSunIcon } from "lucide-react";
import { sunnyBG } from "@/assets";
import { cn } from "@/lib/utils";

interface WeatherDataProps {
    data?: TodaysView;
}

export const WeatherData = ({ data }: WeatherDataProps) => {
    if (data == null || data == undefined) return (
        <div>Loading</div>
        );
        
        if (data.cod == 404) return (
            <div className="h-[50vh] m-5 w-full md:max-w-x4l lg:max-w-6xl">
            <div className="h-[50vh] bg-error404 bg-cover bg-no-repeat text-white  w-full " />
            <p className="text-center text-xl font-bold">City Not Found.</p>
        </div>
    );
    
    const parseWeatherCodeIcon = (code: number): LucideIcon => {
        const codeInitial = Math.trunc(code / 100);
        const codeEnd = code % 10
        switch (codeInitial) {
            case 2:
                return CloudLightningIcon;
            case 3:
                return CloudRainIcon;
            case 5:
                return CloudRainWindIcon;
            case 6:
                return CloudSnowIcon;
            case 7:
                return CloudFogIcon;
            case 8:
                return codeEnd == 0 ? SunIcon : CloudSunIcon;
            default:
                return SunIcon;
        }
    }
    const parseWeatherCodeBackground = (code: number): string => {
        const codeInitial = Math.trunc(code / 100);
        const codeEnd = code % 10
        switch (codeInitial) {
            case 2:
                return "bg-thunderstorm";
            case 3:
                return "bg-rain";
            case 5:
                return "bg-rain";
            case 6:
                return "bg-snow";
            case 7:
                return "bg-fog";
            case 8:
                return codeEnd == 0 ? "bg-sunny" : "bg-cloudy";
            default:
                return "bg-sunny";
        }
    }

    return (
        <div className={cn(
            "h-[50vh] bg-cover bg-no-repeat text-white m-5 w-full md:max-w-x4l lg:max-w-6xl",
            parseWeatherCodeBackground(data.weather[0].id)
        )}>
            <div className="h-full w-full backdrop-blur-sm">
                <div className="p-5 flex flex-col gap-y-2">
                    <div className="flex">
                        <Image
                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            alt="icon"
                            width="150"
                            height="150"
                        />
                        <Item icon={MapPinIcon} title="" value={`${data.coord.lat}, ${data.coord.lon}`} />
                    </div>
                    <Item icon={ThermometerIcon} title="Temperature" value={`${data.main.temp} (${data.main.temp_min} - ${data.main.temp_max})`} />
                    <Item icon={data.main.feels_like > 25 ? ThermometerSunIcon : ThermometerSnowflakeIcon} title="Feels like" value={data.main.feels_like.toString()} />
                    <Item icon={parseWeatherCodeIcon(data.weather[0].id)} title={data.weather[0].main} value={data.weather[0].description} />
                    <Item icon={DropletsIcon} title="Humidity" value={data.main.humidity.toString()} />
                </div>
            </div>
        </div>
    )
}