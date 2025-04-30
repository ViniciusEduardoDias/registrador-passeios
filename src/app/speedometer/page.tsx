"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

function Speedometer() {
  const [trackingPoints, setTrackingPoints] = useState<TrackingPoint[]>([]);
  const watchId = useRef<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<number | null>(0);

  type TrackingPoint = {
    latitude: number;
    longitude: number;
    speed: number | null;
    timestamp: number;
  };

  type TrackingSession = {
    id: string;
    startTime: number;
    endTime: number;
    points: TrackingPoint[];
    averageSpeed: number;
  };

  function startTracking() {
    if (!navigator.geolocation) {
      alert("Geolocation não suportado.");
      return;
    }

    setStartTime(Date.now());

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        setCurrentSpeed(speed ? speed * 3.6 : 0);
        const newPoint: TrackingPoint = {
          latitude,
          longitude,
          speed,
          timestamp: position.timestamp,
        };
        setTrackingPoints((prev) => [...prev, newPoint]);
      },
      (error) => {
        if (error.code === 1) {
          console.log("Permissão negada para acessar a localização.");
        } else if (error.code === 2) {
          console.log("Localização indisponível.");
        } else if (error.code === 3) {
          console.log("Tempo de solicitação excedido.");
        } else {
          console.log("Erro desconhecido:", error.message);
        }
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
    setIsTracking(true);
  }

  function stopTracking() {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;

      const endTime = Date.now();

      const averageSpeed =
        trackingPoints.reduce((acc, p) => acc + (p.speed || 0), 0) /
        trackingPoints.length;

      const newSession: TrackingSession = {
        id: crypto.randomUUID(),
        startTime: startTime!,
        endTime,
        points: trackingPoints,
        averageSpeed,
      };

      // Pegar histórico salvo
      const existingHistory = JSON.parse(
        localStorage.getItem("trackings") || "[]"
      ) as TrackingSession[];

      // Adicionar nova sessão
      existingHistory.push(newSession);

      // Salvar no localStorage
      localStorage.setItem("trackings", JSON.stringify(existingHistory));

      // Resetar estado local
      setTrackingPoints([]);
      setStartTime(null);
      setIsTracking(false);
    }
  }

  return (
    <main className="h-screen w-screen p-6 justify-between flex flex-col">
      <div>
        <Image
          src={"/Registrador.svg"}
          alt="logo"
          width={100}
          height={60}
          style={{ height: "auto" }}
        />
        <button className="absolute right-3 top-3">
          <IoMdClose className="size-10" />
        </button>
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-9xl font-semibold">
          {currentSpeed ? currentSpeed.toFixed(1) : 0}
        </h1>
        <span className="text-2xl font-bold">Km/h</span>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {isTracking ? (
          <button
            onClick={stopTracking}
            className="w-full rounded-lg flex mt-2 justify-center items-center bg-slate-950 text-white font-semibold px-4 py-2 hover:bg-red-600"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={startTracking}
            className="w-full rounded-lg flex justify-center items-center bg-slate-950 text-white font-semibold px-4 py-2 hover:bg-blue-600"
          >
            Start
          </button>
        )}
      </div>
    </main>
  );
}

export default Speedometer;
