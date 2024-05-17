export interface TodaysView {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
 
 
interface Clouds {
    all: number;
}
 
 
interface Wind {
    speed: number;
    deg: number;
}
 
export interface Main {
    feels_like: number;
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
}
 
interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
 
interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}
 
interface Coord {
    lon: number;
    lat: number;
}