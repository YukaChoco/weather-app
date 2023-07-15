'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation'
import { ConvertWeathercodetoText } from '../components/ConvertWeathercodetoText';

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

export default function Location() {

  const searchParams = useSearchParams();
  const [nowWeather, setNowWeather] = useState<number>(-1);

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
    const body = await response.json() as newType // https://zenn.dev/uzimaru0000/articles/json-type-validation あとで修正
    //もしくは axios
    console.log(body);
    console.log("query");
    const date = new Date();
    console.log(date.getHours());

    return body.hourly.weathercode[date.getHours()];
  }

  useEffect(() => {
    fetchWeather(tokyo).then((res) => {
      const weathercode = res;
      if (typeof weathercode === 'number') {
        setNowWeather(weathercode);
      }
    }).catch(e => console.log(e))
  }, [tokyo])

  if (searchParams.has("lat") && searchParams.has("lng")) {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    console.log("lat=" + lat + " lng=" + lng);

    return (
      <>
        <Head>
          <title>weather-icon</title>
          <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="">
            <ConvertWeathercodetoText weathercode={nowWeather}></ConvertWeathercodetoText>
            
          </div>
        </main>
      </>
    )
  }
  else {
    return (
      <div className='bg-gray-200 w-screen h-screen text-center flex'>
        <span className='m-auto w-fit h-fit'>
          ー URLが間違っています ー
        </span>
      </div>
    )
  }
}
