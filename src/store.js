import { defineStore } from 'pinia'
import axios from "axios";

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    cityZip: null,
    cities: {},
    weatherData: {},
    conditions: null,
    dateTime: null,
    recentSearches: [],
    error: null
  }),
  getters: {
    // rounds weather data to the nearest whole number
    roundedValues: (state) => {
      const roundData = {}
      Object.keys(state.weatherData).map(key => {
        return roundData[key] = Math.round(state.weatherData[key])
      })
      return roundData
    }
  },
  actions: {
    // searchWeather function receives inputted zip code as argument, calls API, and stores weather values for selected zip code
    async searchWeather(zipValue) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${zipValue},US&appid=6108bb4a078ca4183c2ba0ae23f0deac&units=imperial`
        );
        this.cityZip = zipValue;
        this.cities = res.data.name;
        this.weatherData = res.data.main;
        this.dateTime = Date(res.data.dt).toLocaleString("en-US");

        const condition = res.data.weather.map(elm => {
          return {
            description: elm.description,
          }
        })

        for (const value of condition.values()) {
          this.conditions = value
        }
                
        this.storeRecentSearch();
      } catch (error) {
        this.error = error
        console.log(error, 'error');
      }
    },
    // handles storing of up to 5 recently searched zip codes
    storeRecentSearch() {
      const allSearches = []
      allSearches.push(
        { 
          name: this.cities, 
          zip: this.cityZip, 
          data: this.roundedValues 
        }
      )

      allSearches.forEach((item) => {
        if (!this.recentSearches.find(e => e.zip === item.zip)) {
          this.recentSearches.unshift(item)

          if (this.recentSearches.length > 5) {
            this.recentSearches.pop()
          }
          console.log(this.recentSearches)
        }
      })
    }
  }
})