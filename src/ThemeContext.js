import React, { useState } from "react"

export const ThemeContext = React.createContext({});

const ThemeProvider = ({children}) => {
    const [weatherData, setWeatherData] = useState({});
  return (
    <ThemeContext.Provider value={{weatherData, setWeatherData}}>
        {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider