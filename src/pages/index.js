import { useState } from 'react';
import ThemeProvider from '@/ThemeContext'
import SearchNavBar from './components/SearchNavBar'
import Forecast from './components/Forecast'
import Time from './components/Time'

export default function Home() {

  const [horaActual, setHoraActual] = useState("");
  const handleHoraActualChange = (nuevaHoraActual) => { setHoraActual(nuevaHoraActual); };

  return (
    <ThemeProvider>
        <SearchNavBar/>
        <Forecast  horaActual={horaActual} />
        <Time onHoraActualChange={handleHoraActualChange} />
    </ThemeProvider>
   )
}
