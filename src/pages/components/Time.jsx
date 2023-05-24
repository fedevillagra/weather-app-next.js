import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/ThemeContext";

const Time = ({ onHoraActualChange }) => {
  const { weatherData } = useContext(ThemeContext);
  const UTC = weatherData.timezone / 3600;

  const obtenerHoraActual = () => {
    const fechaActual = new Date();
    fechaActual.setHours(fechaActual.getUTCHours() + UTC);
    return fechaActual.toLocaleTimeString('es-ES', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const [horaActual, setHoraActual] = useState(obtenerHoraActual());

  useEffect(() => {
    const requestId = requestAnimationFrame(actualizarHora);
    return () => cancelAnimationFrame(requestId);
  }, [weatherData]);

  const actualizarHora = () => {
    const nuevaHoraActual = obtenerHoraActual();
    setHoraActual(nuevaHoraActual);
    onHoraActualChange(nuevaHoraActual); // Llamar a la función de callback con la nueva hora actual
    requestAnimationFrame(actualizarHora);
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {horaActual !== 'Invalid Date' && (
        <h1 className="text-5xl font-light tracking-tight text-white lg:text-6xl px-10 py-8">
          {horaActual}
        </h1>
      )}
    </div>
  );
};

export default Time;