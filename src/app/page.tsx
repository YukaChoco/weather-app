'use client';
import Image from 'next/image'
import { useState } from 'react';


interface City {
  latitude: number,
  longitude: number,
}

interface weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    weathercode: string;
  };
  daily: {
    time: Date[],
    weathercode: number[]
  }
}




export default function Home() {
  const [nowWeather, setNowWeather] = useState<weather>();

  const tokyo: City = {
    latitude: 75.7,       // 緯度
    longitude: 139.6875,  // 経度
  };

  const fetchWeather = async (city: City) => {
    const queries = new URLSearchParams({
      latitude: city.latitude.toString(),
      longitude: city.longitude.toString(),
      daily: "weathercode",
      timezone: "Asia/Tokyo",
    });
    console.log(queries);
    const url = `https://api.open-meteo.com/v1/forecast?${queries}`;
    const response = await fetch(url);
    console.log(response);
    const body = await response.json() as weather
    console.log(body);

    setNowWeather(body);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <button onClick={() => fetchWeather(tokyo)}>aiueo</button>
        {/* {nowWeather && nowWeather.timezone} */}
        {nowWeather?.daily.weathercode[0]}
      </div>
    </main>
  )
}

const convertWeathercodetoText = (weathercode: number) => {
  switch (weathercode) {
    case 0:
      return "晴れ"
    case 1:
    case 2:
    case 3:
      return "晴れ時々曇り"
    case 45:
    case 48:
      return "霧"
    case 51:
    case 53:
    case 55:
      return "霧雨"
    case 56:
    case 57:
      return "雨氷"
    case 61:
    case 63:
    case 65:
      return "雨"
    case 66:
    case 67:
      return "雨氷"
    case 71:
    case 73:
    case 75:
      return "雪"
    case 77:
      return "霧雪"
    case 80:
    case 81:
    case 82:
      return "豪雨"
    case 85:
    case 86:
      return "豪雪"
    case 95:
    case 96:
    case 99:
      return "雷雨"
    default:
      return "-"
  }
}