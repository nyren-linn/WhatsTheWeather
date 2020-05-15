new Vue({
  el: '#app',
  data: {
    forecasts:[],
    pos:[{name: "Göteborg", lng:16.158, lat:58.5812}, {name:"Stockholm", lng:18.0649, lat:59.33258}],
    selected: null
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
    }
  }
})
