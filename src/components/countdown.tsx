import { useEffect, useState } from "react";

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2025-06-13T12:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gray-800/50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          Beta Test em Breve!
        </h2>
        <p className="text-gray-300 mb-4">O teste beta começará em:</p>
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-3xl font-bold text-white" id="days">
              {timeLeft.days}
            </div>
            <div className="text-sm text-gray-400">Dias</div>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-3xl font-bold text-white" id="hours">
              {timeLeft.hours}
            </div>
            <div className="text-sm text-gray-400">Horas</div>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-3xl font-bold text-white" id="minutes">
              {timeLeft.minutes}
            </div>
            <div className="text-sm text-gray-400">Minutos</div>
          </div>
          <div className="bg-gray-900/50 rounded p-3">
            <div className="text-3xl font-bold text-white" id="seconds">
              {timeLeft.seconds}
            </div>
            <div className="text-sm text-gray-400">Segundos</div>
          </div>
        </div>
        <p className="text-gray-300 mt-4">
          Data de início: 13 de junho de 2025 12:00
        </p>
      </div>
    </div>
  );
};
