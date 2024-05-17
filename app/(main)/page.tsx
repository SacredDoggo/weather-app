"use client";

import { TodaysView } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { WeatherData } from "./_components/weather-data";
import { Navbar } from "./_components/navbar";
import { cn } from "@/lib/utils";

export default function Home() {
  const [data, setData] = useState<TodaysView>();
  const [updatingData, setUpdatingData] = useState(false);

  const updateData = async (city?: string) => {
    setUpdatingData(true);
    if (city == undefined) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const coords = pos.coords;
        if (!coords) return;
        const tempData = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`).then(res => res.json());
        setData(tempData);
      });
    }
    else {
      const tempData = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`).then(res => res.json());
      // console.log(tempData);
      setData(tempData);
    }
    setUpdatingData(false);
  }

  useEffect(() => {
    updateData();
  }, []);

  const handleCitySearch = (city: string) => {
    updateData(city)
  }

  return (
    <div className="h-full w-full p-2">
      <Navbar onSubmit={handleCitySearch} />
      <div className={cn("h-full flex items-center justify-center", updatingData && "opacity-70")}>
        <WeatherData data={data} />
      </div>
    </div>
  );
}
