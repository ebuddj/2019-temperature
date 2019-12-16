import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://alligator.io/react/axios-react/
import axios from 'axios';

// https://www.npmjs.com/package/react-div-100vh
import Div100vh from 'react-div-100vh';

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
      search_text:'',
      year:year_start
    }
  }
  componentDidMount() {
    axios.get('./data/data.json')
    .then((response) => {
      this.setState((state, props) => ({
        countries:{'AFG':'Afghanistan','ALB':'Albania','DZA':'Algeria','AND':'Andorra','AGO':'Angola','ATG':'Antigua and Barbuda','ARG':'Argentina','ARM':'Armenia','AUS':'Australia','AUT':'Austria','AZE':'Azerbaijan','BHS':'Bahamas','BHR':'Bahrain','BGD':'Bangladesh','BRB':'Barbados','BLR':'Belarus','BEL':'Belgium','BLZ':'Belize','BEN':'Benin','BTN':'Bhutan','BOL':'Bolivia','BIH':'Bosnia and Herzegovina','BWA':'Botswana','BRA':'Brazil','BRN':'Brunei Darussalam','BGR':'Bulgaria','BFA':'Burkina Faso','BDI':'Burundi','KHM':'Cambodia','CMR':'Cameroon','CAN':'Canada','CPV':'Cabo Verde','CAF':'Central African Republic','TCD':'Chad','CHL':'Chile','CHN':'China','COL':'Colombia','COM':'Comoros','COD':'Congo-Kinshasa','COG':'Congo-Brazzaville','CRI':'Costa Rica','CIV':'Côte d\'Ivoire','HRV':'Croatia','CUB':'Cuba','CYP':'Cyprus','CZE':'Czechia','DNK':'Denmark','DJI':'Djibouti','DMA':'Dominica','DOM':'Dominican Republic','ECU':'Ecuador','EGY':'Egypt','SLV':'El Salvador','GNQ':'Equatorial Guinea','ERI':'Eritrea','EST':'Estonia','ETH':'Ethiopia','FRO':'Faroe Islands','FSM':'Micronesia','FJI':'Fiji','FIN':'Finland','FRA':'France','GAB':'Gabon','GMB':'Gambia','GEO':'Georgia','DEU':'Germany','GHA':'Ghana','GRC':'Greece','GRL':'Greenland','GRD':'Grenada','GTM':'Guatemala','GIN':'Guinea','GNB':'Guinea-Bissau','GUY':'Guyana','HTI':'Haiti','HND':'Honduras','HUN':'Hungary','ISL':'Iceland','IND':'India','IDN':'Indonesia','IRN':'Iran','IRQ':'Iraq','IRL':'Ireland','ISR':'Israel','ITA':'Italy','JAM':'Jamaica','JPN':'Japan','JOR':'Jordan','KAZ':'Kazakhstan','KEN':'Kenya','KIR':'Kiribati','PRK':'North Korea','KOR':'South Korea','KWT':'Kuwait','KGZ':'Kyrgyzstan','LAO':'Lao','LVA':'Latvia','LBN':'Lebanon','LSO':'Lesotho','LBR':'Liberia','LBY':'Libya','LIE':'Liechtenstein','LTU':'Lithuania','LUX':'Luxembourg','MKD':'Republic of North Macedonia','MDG':'Madagascar','MWI':'Malawi','MYS':'Malaysia','MDV':'Maldives','MLI':'Mali','MLT':'Malta','MHL':'Marshall Islands','MRT':'Mauritania','MUS':'Mauritius','MEX':'Mexico','MDA':'Moldova','MCO':'Monaco','MNG':'Mongolia','MAR':'Morocco','MOZ':'Mozambique','MMR':'Myanmar','NAM':'Namibia','NPL':'Nepal','NLD':'Netherlands','NCL':'New Caledonia','NZL':'New Zealand','NIC':'Nicaragua','NER':'Niger','NGA':'Nigeria','MNP':'Northern Mariana Islands','NOR':'Norway','OMN':'Oman','PAK':'Pakistan','PLW':'Palau','PAN':'Panama','PNG':'Papua New Guinea','PRY':'Paraguay','PER':'Peru','PHL':'Philippines','POL':'Poland','PRT':'Portugal','PRI':'Puerto Rico','QAT':'Qatar','MNE':'Montenegro','SRB':'Serbia','ROU':'Romania','RUS':'Russian Federation','RWA':'Rwanda','WSM':'Samoa','STP':'Sao Tome and Principe','SAU':'Saudi Arabia','SEN':'Senegal','SYC':'Seychelles','SLE':'Sierra Leone','SGP':'Singapore','SVK':'Slovakia','SVN':'Slovenia','SLB':'Solomon Islands','SOM':'Somalia','ZAF':'South Africa','SSD':'South Sudan','ESP':'Spain','LKA':'Sri Lanka','KNA':'Saint Kitts and Nevis','LCA':'Saint Lucia','VCT':'Saint Vincent and the Grenadines','SDN':'Sudan','SUR':'Suriname','SWZ':'Eswatini','SWE':'Sweden','CHE':'Switzerland','SYR':'Syrian Arab Republic','TJK':'Tajikistan','TZA':'Tanzania','THA':'Thailand','TLS':'Timor-Leste','TGO':'Togo','TON':'Tonga','TTO':'Trinidad and Tobago','TUN':'Tunisia','TUR':'Turkey','TKM':'Turkmenistan','TUV':'Tuvalu','UGA':'Uganda','UKR':'Ukraine','ARE':'United Arab Emirates','GBR':'United Kingdom','USA':'United States of America','URY':'Uruguay','UZB':'Uzbekistan','VUT':'Vanuatu','VEN':'Venezuela','VNM':'Viet Nam','YEM':'Yemen','ZMB':'Zambia','ZWE':'Zimbabwe'},
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
    // Reduce the number of colors.
    // value = Math.ceil(value / 0.25) * 0.25;
    value = -value;
    let base = (max - min);
    if (base == 0) {
      value = 100;
    }
    else {
      value = (value - min) / base * 100; 
    }
    let r = 0, b = 0, g = 0;
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
          expand:false,
          search_text:''
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
    let country = Object.keys(this.state.countries).filter((key) => (this.state.countries[key] === event.target.value))[0] || event.target.value;
    this.setState((state, props) => ({
      search_text:country
    }));
    let temperature = this.state.current_data.filter(obj => {
      return obj.country === country;
    });
    if (temperature.length === 1) {
      this.setState((state, props) => ({
        active_country_id:Object.keys(this.state.countries).findIndex((el) => el === country),
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
        <Div100vh>
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
              <input list="countries" type="text" placeholder="Search country" value={(this.state.search_text !== 'ALL') ? this.state.search_text : ''} onChange={(event) => this.handleSearchChange(event)} />
              <datalist id="countries">
                {
                  this.state.countries && Object.values(this.state.countries).map((country, i) => {
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
                if (this.state.current_year_average_temp !== null && this.state.current_year_average_temp > scale  && this.state.current_year_average_temp < (scale + 0.05)) {
                  return (<div key={i} className={style.scale_container} style={{backgroundColor:'#fff'}}><div className={style.scale_text}><div>{this.state.year}</div><div>{(this.state.current_year_average_temp > 0 ? '+' : '') + this.state.current_year_average_temp.toFixed()}°C</div></div></div>);
                }
                else if (scale > -0.025 && scale < 0.025) {
                  return (<div key={i} className={style.scale_container} style={{backgroundColor:this.value2color(scale, scale_min, scale_max), borderBottom:'1px dashed rgba(255, 255, 255, 0.3)'}}><div className={style.scale_text_zero}><div>0°C</div></div></div>);
                }
                else if (scale < -0.625 && scale > -0.675) {
                  return (<div key={i} className={style.scale_container} style={{backgroundColor:this.value2color(scale, scale_min, scale_max), borderBottom:'1px dashed rgba(255, 255, 255, 0.3)'}}><div className={style.scale_text_1901}><div>-0.6°C</div></div></div>);
                }
                else {
                  return (<div key={i} className={style.scale_container} style={{backgroundColor:this.value2color(scale, scale_min, scale_max)}}></div>);
                }
              })
            }
          </div>
        </Div100vh>
      </div>
    );
  }
}
export default App;