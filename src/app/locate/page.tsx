'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation'
import { ConvertWeathercodetoText } from '../_components/ConvertWeathercodetoText';
import { City } from '../_domain/CoordinatesEntity';
import { WeatherAPIProps } from '../_domain/WeatherEntity';



export default function Location() {

  const searchParams = useSearchParams();
  const [nowWeather, setNowWeather] = useState<number>(-1);
  const [location, setLocation] = useState<City>({ latitude: 0, longitude: 0, });
  const [error, setError] = useState<number>(-1);

  const fetchWeather = async () => {
    const queries = new URLSearchParams({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      hourly: "weathercode",
      timezone: "Asia/Tokyo",
    });

    console.log("latitude=" + location.latitude + ",longitude=" + location.longitude + " の天気を取得しました");

    const url = `https://api.open-meteo.com/v1/forecast?${queries}`;
    const response = await fetch(url);
    const body = await response.json() as WeatherAPIProps;

    const date = new Date();

    const weathercode = body.hourly.weathercode[date.getHours()];
    setNowWeather(weathercode);
  }

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    const paramLat = searchParams.get("lat");
    const paramLng = searchParams.get("lng");
    console.log("lat=" + paramLat + " lng=" + paramLng);
    if (paramLat === null || paramLng === null) {
      setError(1);
      console.log("ERROR:latとlngをパラメータに指定してください");
    }
    else {
      const lat = parseInt(paramLat);
      const lng = parseInt(paramLng);
      if (lat < -90 || lat > 90) {
        setError(2);
        console.log("ERROR:latは-90から90の範囲で指定してください");
      }
      else if (lng < -180 || lng > 180) {
        setError(3);
        console.log("ERROR:lngは-180から180の範囲で指定してください");
      }
      else {
        setError(0);
        setLocation({ latitude: lat, longitude: lng });
      }
    }
  }, [searchParams])

  if (error == 0) {
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
  else if (error == -1) {
    return (
      <div className='bg-gray-200 w-screen h-screen text-center flex'>
        <span className='m-auto w-fit h-fit'>
          ー Roading ー
        </span>
      </div>
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
