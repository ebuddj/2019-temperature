import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://alligator.io/react/axios-react/
import axios from 'axios';

const year_start = 1901,
      year_end = 2016,
      scale_max = 2,
      scale_min = -2,
      interval_timeout = 200,
      month_names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let interval;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active_country_id:null,
      active_country_name:'ALL',
      active_country_temp:null,
      controls_text:'Play',
      current_year_average_temp:null,
      expand:false,
      interval_play:false,
      year:year_start
    }
  }
  componentDidMount() {
    axios.get('./data/data.json')
    .then((response) => {
      this.setState((state, props) => ({
        countries:response.data[year_start].map((data, i) => { return data.country}),
        current_data:response.data[year_start],
        data:response.data
      }), this.showData);
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnMount() {

  }
  showData() {
    this.getCurrentYearAverageTemp();
    setTimeout(() => {
      // this.toggleInterval(year_start);
    }, 2000);
  }
  toggleInterval(year) {
    if (parseInt(year) === year_end) {
      year = year_start
    }
    if (this.state.interval === true) {
      clearInterval(interval);
      this.setState((state, props) => ({
        controls_text:'Play',
        interval:false,
      }));
    }
    else {
      interval = setInterval(() => {
        if (year > year_end) {
          clearInterval(interval);
          year = year_end;
          this.setState((state, props) => ({
            controls_text:'Play',
            interval:false
          }));
        }
        else {
          this.setState((state, props) => ({
            controls_text:'Pause',
            current_data:this.state.data[year],
            interval:true,
            year:year
          }), this.getCurrentYearAverageTemp);
        }
        year++;
      }, interval_timeout);
    }
  }
  value2color(value, min, max) {
    if (value > max) {
      value = max;
    }
    else if (value < min) {
      value = min;
    }
    value = -value;
    let base = (max - min);
    if (base == 0) {
      value = 100;
    }
    else {
      value = (value - min) / base * 100; 
    }
    let r = 0, b = 0, g = 25;
    if (value < 50) {
      r = 255; b = Math.round(5.1 * value);
    }
    else {
      r = Math.round(510 - 5.1 * value); b = 255;
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }
  getCurrentYearAverageTemp() {
    let temperature;
    if (this.state.active_country_id !== null) {
      temperature = this.state.current_data.filter(obj => {
        return obj.country === this.state.active_country_name;
      });
      temperature = temperature[0].data.reduce((total, current) => total + current.value, 0) / temperature[0].data.length;
      this.setState((state, props) => ({
        active_country_temp:temperature,
        current_year_average_temp:null
      }));
    }
    else {
      temperature = this.state.current_data.reduce((total, current) => total + (current.data.reduce((country_total, country_current) => country_total + country_current.value, 0)) / current.data.length, 0) / this.state.current_data.length;
      this.setState((state, props) => ({
        active_country_temp:temperature,
        current_year_average_temp:temperature
      }));
    }
  }
  handleYearChange(event) {
    clearInterval(interval);
    let year = event.target.value;
    this.setState((state, props) => ({
      controls_text:'Play',
      current_data:this.state.data[year],
      interval:false,
      year:year
    }), this.getCurrentYearAverageTemp);
  }
  handleCountryClick(data, i, status) {
    if (status === 'clicked') {
      this.setState((state, props) => ({
        expand:true
      }));
    }
    else {
      if (this.state.active_country_id === i) {
        this.setState((state, props) => ({
          active_country_id:null,
          active_country_name:'ALL',
          expand:false
        }), this.getCurrentYearAverageTemp);
      }
      else {
        this.setState((state, props) => ({
          active_country_id:i,
          active_country_name:data.country,
          active_country_temp:data.data.reduce((total, current) => total + current.value, 0) / data.data.length,
          expand:false
        }), this.getCurrentYearAverageTemp);
      }
    }
  }
  handleSearchChange(event) {
    let country = event.target.value;
    let temperature = this.state.current_data.filter(obj => {
      return obj.country === country;
    });
    if (temperature.length === 1) {
      this.setState((state, props) => ({
        active_country_id:1,
        active_country_name:country,
        active_country_temp:temperature[0].data.reduce((total, current) => total + current.value, 0) / temperature[0].data.length,
        expand:true
      }), this.getCurrentYearAverageTemp);
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {}
  // static getDerivedStateFromProps(props, state) {}
  // getSnapshotBeforeUpdate(prevProps, prevState) {}
  // static getDerivedStateFromError(error) {}
  // componentDidCatch() {}
  render() {
    let scales = [], temperature = scale_max;
    while (temperature > scale_min) {
      temperature = temperature - 0.05;
      scales.push(temperature);
    }
    return (
      <div className={style.app}>
        <div className={style.month_names_container}>
          {
            month_names.map((month, i) => {
              return (
                <div key={i} className={style.month_name}>{month}</div>
              );
            })
          }
        </div>
        <div className={style.countries_container}>
          {
            this.state.current_data && this.state.current_data.map((data, i) => {
              let country_container_class;
              let status = '';
              if (this.state.expand === true) {
                if (this.state.active_country_id === i) {
                  country_container_class = style.country_container_expanded + ' ' + style.country_container;
                }
                else {
                  country_container_class = style.country_container_collapsed + ' ' + style.country_container;
                }
              }
              else {
                if (this.state.active_country_id === i) {
                  status = 'clicked';
                  country_container_class = style.county_container_active + ' ' + style.country_container;
                }
                else if (this.state.active_country_id !== null) {
                  country_container_class = style.county_container_unactive + ' ' + style.country_container;
                }
                else {
                  country_container_class = style.country_container;
                }
              }
              return (
                <div key={i} className={country_container_class} onClick={() => this.handleCountryClick(data, i, status)}>
                  <div className={style.country_name}>{data.country}</div>
                  {
                    data.data.map((month_data, i) => {
                      let title_first_line = this.state.year + ' ' + month_data.month;
                      let title_second_line = data.country + ' ' + (month_data.value > 0 ? '+' : '') + month_data.value.toFixed(1) + '°C';
                      return (
                        <div key={i} className={style.month_value} style={{backgroundColor:this.value2color(month_data.value, scale_min, scale_max)}}>
                          <span className={style.tooltiptext}>{title_first_line}<br />{title_second_line}</span>
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
        <div className={style.meta_container}>
          <div className={style.search_container}>
            <input list="countries" type="text" placeholder="Search country…" onChange={(event) => this.handleSearchChange(event)} />
            <datalist id="countries">
              {
                this.state.countries && this.state.countries.map((country, i) => {
                  return (<option key={i} value={country} />);
                })
              }
            </datalist>
          </div>
          <div className={style.active_country_container}>
            <span className={style.active_country_name}>{this.state.active_country_name}</span>
            <span className={style.active_country_temp}>{this.state.active_country_temp !== null && (this.state.active_country_temp > 0 ? '+' : '') + this.state.active_country_temp.toFixed(1) + '°C'}</span>
          </div>
          <div className={style.year_container}>{this.state.year}</div>
          <div className={style.range_container}>
            <input type="range" min={year_start} value={this.state.year} max={year_end} onChange={(event) => this.handleYearChange(event)} />
          </div>
          <div className={style.controls_container} onClick={() => this.toggleInterval(this.state.year)}>{this.state.controls_text}</div>
        </div>
        <div className={style.scales_container}>
          {
            scales.map((scale, i) => {
              return ((this.state.current_year_average_temp !== null && this.state.current_year_average_temp > scale  && this.state.current_year_average_temp < (scale + 0.05)) ? <div key={i} className={style.scale_container} style={{backgroundColor:'#fff'}}><span className={style.scale_text}><div>{this.state.year}</div><div>{(this.state.current_year_average_temp > 0 ? '+' : '') + this.state.current_year_average_temp.toFixed(1)}°C</div></span></div> : <div key={i} className={style.scale_container} style={{backgroundColor:this.value2color(scale, scale_min, scale_max)}}></div>)
            })
          }
        </div>
      </div>
    );
  }
}
export default App;