'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { PrefectureSelecter } from './components/PrefectureSelecter';
import { City } from './domain/CoordinatesEntity';

export default function Home() {

  const [location, setLocation] = useState<City>({ latitude: 33.915461, longitude: 134.273465 });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">
          <p>都道府県を選択して下さい</p>
          <PrefectureSelecter location={location} ></PrefectureSelecter>
        </div>
      </main>
    </>
  )
}
