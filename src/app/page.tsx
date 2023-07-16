'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
export default function Home() {
  
  const [location,setLocation]=useState();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">
          都道府県を選択して下さい
        </div>
      </main>
    </>
  )
}