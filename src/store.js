import { defineStore } from 'pinia'

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
    storeRecentSearch() {
      const allSearches = []
      allSearches.push(this.cityZip)

      allSearches.forEach((item) => {
        // // handle 5 items in array at a time
        // if (!this.recentSearches.includes(item) && this.recentSearches.length > 4) {
        //   // add item to beginning of array
        //   this.recentSearches.unshift(item)
        //   // remove item from end of array
        //   this.recentSearches.pop()
        //   console.log('length', this.recentSearches)
        // }
        // else if (!this.recentSearches.includes(item)) {
        //   this.recentSearches.unshift(item)
        //   console.log('unshift', this.recentSearches)
        // } 
        if (!this.recentSearches.includes(item)) {
          this.recentSearches.unshift(item)
          console.log('unshift', this.recentSearches)
        } 
      })
    }
  }
})