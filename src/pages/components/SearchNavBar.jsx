import { Fragment, useContext, useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { ThemeContext } from '@/ThemeContext';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SearchNavBar = () => {

    const context = useContext(ThemeContext);
    const { setWeatherData} = context;

    const [suggestedCities, setSuggestedCities] = useState({});
    const [cityInput, setCityInput] = useState([]);
    useEffect(() => { getWeatherData(); }, [cityInput]);

    async function handleQueryChange(query) {
        if(!query){return;}
      try {
        const geocodingResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        const geocodingData = await geocodingResponse.json();

        setSuggestedCities(geocodingData);
      } catch (error) {
        console.log(error);
        setSuggestedCities([]);
      }
    }

    const getWeatherData = async () => {
        if(!suggestedCities.length){return;}
        try {   
            const { lat , lon } = cityInput;
              const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?`+
                `lat=${lat}`+
                `&lon=${lon}`+
                `&appid=${API_KEY}`+
                `&units=metric`
              );
              const weatherData = await weatherResponse.json();
        
              if (weatherData?.code === "400") throw weatherData;
              setWeatherData(weatherData);
              setSuggestedCities({});
        } catch (error) {
          console.log(error);
        }
    }

  const [open, setOpen] = useState(true) //para abrir la barra de busqueda

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
            {/* bg-gray-900 opacity-50 */}
          <Dialog.Overlay className="fixed inset-0" /> 
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            value={cityInput}
            onChange={setCityInput}
          >
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Enter your city..."
                onChange={(e) => {handleQueryChange(e.target.value);}}
                autoComplete="off"
              />
            </div>

            {suggestedCities.length > 0 && (
              <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                {suggestedCities.map((city,id) => (
                  <Combobox.Option
                    key={id}
                    value={city}
                    className={({ active }) =>
                    classNames('cursor-default select-none px-4 py-2', active && 'bg-blue-600 text-white')
                    }
                  >
                    {city.name}, {city.state && `${city.state}, `}{city.country}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {(suggestedCities.length === 0) && (
              <p className="p-4 text-sm text-gray-500">No city found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default SearchNavBar