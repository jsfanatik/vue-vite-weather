import { defineStore } from 'pinia'
import axios from "axios";

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    cityZip: null,
    cities: {},
    weatherData: {},
    dateTime: null,
    recentSearches: []
  }),
  getters: {
    roundedValues: (state) => {
      const roundData = {}
      Object.keys(state.weatherData).map(key => {
        return roundData[key] = Math.round(state.weatherData[key])
      })
      return roundData
    }
  },
  actions: {
    // open dialog forces API call to update all values
    async searchWeather(zipValue) {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${zipValue},US&appid=d2c9aaafb6c5d4d2632592ce88154c5f&units=imperial`
        );
        this.cityZip = zipValue
        this.cities = res.data.name;
        this.weatherData = res.data.main;
        const date = Date(res.data.dt).toLocaleString("en-US");
        this.dateTime = date
        this.storeRecentSearch();
      } catch (error) {
        console.log(error);
      }
    },
    storeRecentSearch() {
      const allSearches = []
      // allSearches.push(this.cityZip)
      allSearches.push({ name: this.cities, zip: this.cityZip, data: this.roundedValues })

      allSearches.forEach((item) => {
        // console.log(item)
        if (!this.recentSearches.find(e => e.zip === item.zip)) {
          this.recentSearches.unshift(item)

          if (this.recentSearches.length > 5) {
            this.recentSearches.pop()
          }
          // console.log('unshift', this.recentSearches)
        }
      })
    }
  }
})