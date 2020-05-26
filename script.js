let Start = Vue.component('start', {
template: `
<div class="start">
  <strong>Kul att du har hittat hit!! </strong>
  <div class="startText">
    Hos oss kan du får reda på det senaste vädret i tio av Sveriges största städer.
  </div>
  <img src="https://media.giphy.com/media/U32hN2EPpgEzS/giphy.gif" alt="SummerGif">
</div>`
})

let Weather = Vue.component('weather', {
  data() {
    return {
      forecasts:[],
    pos:[{name:"Göteborg", lng:16.158, lat:58.5812},{name:"Helsingborg", lng:12.68000, lat:56.04000},{name:"Jönköping", lng:14.17000, lat:57.78000},
        {name:"Linköping", lng:15.67000, lat:58.38000},{name:"Malmö", lng:13.00073, lat:55.60587},{name:"Stockholm", lng:18.0649, lat:59.33258},
        {name:"Upplands Väsby och Sollentuna", lng:17.94000, lat:59.43000},{name:"Uppsala", lng:17.70000, lat:59.87000},{name:"Västerås", lng:16.55000, lat:59.60000},
        {name:"Örebro", lng:15.18000, lat:59.28000}],
    selected: '',
    selectedReport:''
    }
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
          //this.selected = obj
      })
    }
  },
  methods:{
    getImgFromObjectUrl(){
      return "https://www.smhi.se/tendayforecast/images/WPT-icons/weathersymbols/80x60/day/" + this.selectedReport.parameters[18].values[0] +".png?v=1550503846134&proxy=wpt-abc";
    },
    formatDateTime(timestamp){
      let date = new Date(timestamp)
      let day = date.getDate();
      let month = date.getMonth() +1
      let hour = date.getHours() <10 ? "0"+date.getHours() : date.getHours(); //Switch sats samma som en if sats, är påståendet sant väljd första alternativet, annars andra.
      return day+"/"+month +" kl. "+hour+":00"
    },
  },
  
  template: `
  <div class="weather">
  <br>
            <select v-model="selected">
                <option value="">Select a city</option>
                <option v-for="cast in forecasts" :value="cast">{{cast.name}}</option>
            </select>
            <br>
            <br>
            <select v-model="selectedReport">
                <option value="">Select a time</option>
                <option v-for="obj in selected.reports" :value="obj">
                    {{formatDateTime(obj.validTime)}}
                </option>
            </select>
            <br>
            
            <div v-if="typeof(selectedReport)==='object'">
                <strong style="font-size:30px">{{selected.name}}</strong>
                <br>
                <img :src="getImgFromObjectUrl()">
                <br>
                <strong>{{formatDateTime(selectedReport.validTime)}}</strong>
                <br>
                
                <table>
                    <tr>
                        <th>Degrees</th>
                        <th>Wind speed</th>
                        <th>Precipitation</th>
                    </tr>
                    <tr>
                        <td>{{selectedReport.parameters[11].values[0]}} C</td>
                        <td>{{selectedReport.parameters[17].values[0]}} m/s</td>
                        <td>{{selectedReport.parameters[2].values[0]}} - {{selectedReport.parameters[4].values[0]}}  mm/h</td>
                    </tr>
                </table>

                <br>

            </div>
  </div>`
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
    // forecasts:[],
    // hourForecasts:[0,1,2,3,5,6,7,8,9,10,11,12], //sätta 0-70?
    // pos:[{name:"Göteborg", lng:16.158, lat:58.5812},{name:"Helsingborg", lng:12.68000, lat:56.04000},{name:"Jönköping", lng:14.17000, lat:57.78000},
    //     {name:"Linköping", lng:15.67000, lat:58.38000},{name:"Malmö", lng:13.00073, lat:55.60587},{name:"Stockholm", lng:18.0649, lat:59.33258},
    //     {name:"Upplands Väsby och Sollentuna", lng:17.94000, lat:59.43000},{name:"Uppsala", lng:17.70000, lat:59.87000},{name:"Västerås", lng:16.55000, lat:59.60000},
    //     {name:"Örebro", lng:15.18000, lat:59.28000}],
    // selected: '',
    // selectedHour: ''
  },
  // created(){
  //   for(let i=0; i<this.pos.length; i++){
  //     var url = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/"+this.pos[i].lng+"/lat/"+this.pos[i].lat+"/data.json";
  //     fetch(url)
  //     .then(response => response.json())
  //     .then(result => {
  //         let obj={
  //           name:this.pos[i].name,
  //           reports:result.timeSeries
  //         }
  //         this.forecasts.push(obj)
  //         this.selected = obj
  //     })
  //   }
  // },
  // methods:{
  //   getImgUrl(pet) {
  //     let url = "https://www.smhi.se/tendayforecast/images/WPT-icons/weathersymbols/80x60/day/" + pet +".png?v=1550503846134&proxy=wpt-abc"
  //     return url
  //   },
  //   formatDate(date) {
  //     return date.replace("T", " kl: ")
  //   },
  //   formatTime(time) {
  //     return time.replace(":00:00Z", " ")
  //   }
  // }
})
