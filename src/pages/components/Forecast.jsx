import { ThemeContext } from "@/ThemeContext";
import { useContext } from "react";

const Forecast = () => {

    const context = useContext(ThemeContext);
    const { weatherData } = context;

    let bgImage = "url('140915_BURKARD_90601-1.webp')"; // Imagen predeterminada

    if (weatherData?.main?.temp) {
        const temperature = weatherData.main.temp;
        if (temperature > 25) {
            bgImage = "url('140915_BURKARD_90601-1.webp')";
        } else if (temperature < 15) {
            bgImage = "url('photo-1454496522488-7a8e488e8606.avif')";
        } else {
            bgImage = "url('iYvDeqVGRbebiQv2PIJi_DSC_8407.avif')";
        }
      }

    return (
        <>
        <div className='bg-cover bg-center h-screen' style={{backgroundImage: `${bgImage}`}}>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />
          {(Object.keys(weatherData).length !== 0 && Object.keys(weatherData).length !== 2)?
          <div className="relative max-w-max mx-auto items-center py-32 px-6 text-center sm:py-64 lg:px-0">
            <div className="flex bg-gray-900 bg-opacity-60 rounded-lg p-4">
                <img
                src={"https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png"}
                height="100px"
                width="100px"
                />
                <div className="flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                    {weatherData.name}, {weatherData.sys.country}
                </h1>
                <p className="mt-4 text-xl text-white">
                    Actualmente {weatherData.main.temp.toFixed()}&deg;C
                </p>
                </div>
            </div>
          </div>
                : null
            }
        </div>
        </>
    )
  }
export default Forecast