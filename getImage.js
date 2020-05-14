new Vue({
  el: '#app',
  created(){
    for(let i=0; i<this.pos.length; i++){
      var url = "https://www.smhi.se/tendayforecast/images/WPT-icons/weathersymbols/80x60/day/" + ({{cast.reports[0].parameters[18].values[0]}}) + ".png?v=1550503846134&proxy=wpt-abc";
      fetch(url)
      .then(response => response.json())
      .then(result => {
          let obj={
            name:this.pos[i].name,
            reports:result.timeSeries
          }
          this.forecasts.push(obj)
          
      })
    }
  }
})
