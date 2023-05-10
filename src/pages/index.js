import ThemeProvider from '@/ThemeContext'
import SearchNavBar from './components/SearchNavBar'
import Forecast from './components/Forecast'

export default function Home() {
  return (
    <ThemeProvider>

          <SearchNavBar/>
          <Forecast/>
        
  </ThemeProvider>
   )
}
