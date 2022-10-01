import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
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
    storeRecentSearch() {
      const allSearches = []
      allSearches.push(this.cities)
      allSearches.forEach((item) => {
        if (!this.recentSearches.includes(item)) {
          this.recentSearches.push(item)
        }
      })
    }
  }
})