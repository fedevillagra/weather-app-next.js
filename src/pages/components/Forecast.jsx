import { ThemeContext } from "@/ThemeContext";
import { useContext } from "react";

const Forecast = ({ horaActual }) => {
  const context = useContext(ThemeContext);
  const { weatherData } = context;

  let bgImage;
  let hora;
  if (horaActual) {
    hora = parseInt(horaActual.split(":")[0]);
  }

  if (hora && (hora < 8 || hora > 20)) {
    bgImage = "url('nature-3194001_1280.jpg')"; // night image
  } else {
    bgImage = "url('140915_BURKARD_90601-1.webp')"; // Imagen predeterminada
  }

  return (
    <>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: bgImage }}>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />
        {weatherData && Object.keys(weatherData).length !== 0 && (
          <div className="relative max-w-max mx-auto items-center py-32 px-6 text-center sm:py-64 lg:px-0">
            <div className="flex bg-gray-900 bg-opacity-60 rounded-lg p-4">
              {weatherData.weather && weatherData.weather[0] && (
                <>
                  <div className="flex-col">
                    <img
                      src={"https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png"}
                      height="100px"
                      width="100px"
                    />
                    <p className="text-l text-white">
                      {weatherData.weather[0].description.charAt(0).toUpperCase() +
                        weatherData.weather[0].description.slice(1)}
                    </p>
                  </div>
                </>
              )}
              <div className="flex-col">
                <h1 className="text-2xl font-bold tracking-tight text-white lg:text-5xl">
                  {weatherData.name}, {weatherData.sys.country}
                </h1>
                <p className="mt-4 text-xl text-white">Current weather {weatherData.main.temp.toFixed()}°C</p>
                <p className="mt-2 text-l text-white">Feels like {weatherData.main.feels_like.toFixed()}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Forecast;