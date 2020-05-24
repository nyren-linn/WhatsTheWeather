let Start = Vue.component('start', {
template: `<strong>HEJ PÅ DIG!!! </strong>`
})

let Weather = Vue.component('weather', {
  template: `<strong>HÄR ÄR VÄDRET</strong>`
})

let About = Vue.component('about', {
  template: `<strong>VI ÄR COOLA</strong>`
})

let router = new VueRouter({
  routes: [
    { component: Start, path: '/' }, 
    { component: Weather, path: '/weather' }, 
    { component: About, path: '/about' }
  ]
})

new Vue({
  el: '#app',
  router: router,
  data: {
    forecasts:[],
    hourForecasts:[0,1,2,3,5,6,7,8,9,10,11,12], //sätta 0-70?
    pos:[{name:"Göteborg", lng:16.158, lat:58.5812},{name:"Helsingborg", lng:12.68000, lat:56.04000},{name:"Jönköping", lng:14.17000, lat:57.78000},
        {name:"Linköping", lng:15.67000, lat:58.38000},{name:"Malmö", lng:13.00073, lat:55.60587},{name:"Stockholm", lng:18.0649, lat:59.33258},
        {name:"Upplands Väsby och Sollentuna", lng:17.94000, lat:59.43000},{name:"Uppsala", lng:17.70000, lat:59.87000},{name:"Västerås", lng:16.55000, lat:59.60000},
        {name:"Örebro", lng:15.18000, lat:59.28000}],
    selected: '',
    selectedHour: ''
  },
  created(){
    for(let i=0; i<this.pos.length; i++){
      var url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+this.pos[i].lng+"/lat/"+this.pos[i].lat+"/data.json";
      fetch(url)
      .then(response => response.json())
      .then(result => {
          let obj={
            name:this.pos[i].name,
            reports:result.timeSeries
          }
          this.forecasts.push(obj)
          this.selected = obj
      })
    }
  },
  methods:{
    getImgUrl(pet) {
      let url = "https://www.smhi.se/tendayforecast/images/WPT-icons/weathersymbols/80x60/day/" + pet +".png?v=1550503846134&proxy=wpt-abc"
      return url
    },
    formatDate(date) {
      return date.replace("T", " kl: ")
    },
    formatTime(time) {
      return time.replace(":00:00Z", " ")
    }
  }
})
