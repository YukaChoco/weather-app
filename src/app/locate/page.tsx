'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';

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
type newType = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    weathercode: string;
  };
  hourly: {
    time: Date[],
    weathercode: number[]
  };
}

export default function Home() {
  const [nowWeather, setNowWeather] = useState<string>('-');

  const tokyo: City = {
    latitude: 35.0167,       // 緯度
    longitude: 135.9667,  // 経度
  };

  const fetchWeather = async (city: City) => {
    const queries = new URLSearchParams({
      latitude: city.latitude.toString(),
      longitude: city.longitude.toString(),
      hourly: "weathercode",
      timezone: "Asia/Tokyo",
    });
    console.log(queries);
    const url = `https://api.open-meteo.com/v1/forecast?${queries}`;
    const response = await fetch(url);
    console.log(response);
    const body = await response.json() as newType
    console.log(body);

    const date = new Date();
    console.log(date.getHours());

    return body.hourly.weathercode[date.getHours()];
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
        return "曇り"
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return "雨"
      case 71:
      case 73:
      case 75:
      case 77:
        return "雪"
      case 80:
      case 81:
      case 82:
        return "雨"
      case 85:
      case 86:
        return "雪"
      case 95:
      case 96:
      case 99:
        return "雨"
      default:
        return "-"
    }
  }

  useEffect(() => {
    fetchWeather(tokyo).then((res) => {
      const weathercode = res
      setNowWeather(convertWeathercodetoText(weathercode));
    }).catch(e => console.log(e))
  }, [])

  return (
    <>
      <Head>
        <title>weather-icon</title>
        <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">
          {nowWeather}
        </div>
      </main>
    </>
  )
}