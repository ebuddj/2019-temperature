import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://alligator.io/react/axios-react/
import axios from 'axios';

// https://www.npmjs.com/package/react-div-100vh
import Div100vh from 'react-div-100vh';

// https://vis4.net/chromajs/
import chroma from 'chroma-js';

// https://d3js.org/
import * as d3 from 'd3';

let interval;

// Define constants.
const yearStart = 1901,
      yearEnd = 2020,
      scaleMax = 3,
      scaleMin = -3,
      intervalTimeout = 300,
      avg_temps = [-0.15,-0.28,-0.37,-0.47,-0.26,-0.22,-0.39,-0.43,-0.48,-0.43,-0.44,-0.36,-0.34,-0.15,-0.14,-0.36,-0.46,-0.3,-0.27,-0.27,-0.19,-0.29,-0.27,-0.27,-0.22,-0.11,-0.22,-0.2,-0.36,-0.16,-0.1,-0.16,-0.29,-0.12,-0.2,-0.15,-0.03,0,-0.02,0.12,0.18,0.06,0.09,0.2,0.09,-0.07,-0.03,-0.11,-0.11,-0.17,-0.07,0.01,0.08,-0.13,-0.14,-0.19,0.05,0.06,0.03,-0.03,0.06,0.03,0.05,-0.2,-0.11,-0.06,-0.02,-0.08,0.05,0.03,-0.08,0.01,0.16,-0.07,-0.01,-0.1,0.18,0.07,0.16,0.26,0.32,0.14,0.31,0.16,0.12,0.18,0.32,0.39,0.27,0.45,0.41,0.22,0.23,0.32,0.45,0.33,0.47,0.61,0.39,0.4,0.54,0.63,0.62,0.54,0.68,0.64,0.66,0.54,0.66,0.72,0.61,0.65,0.68,0.74,0.9,1.01,0.92,0.85,0.98,1.02],
      monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      countries = {'AFG':'Afghanistan','ALB':'Albania','DZA':'Algeria','AND':'Andorra','AGO':'Angola','ATG':'Antigua and Barbuda','ARG':'Argentina','ARM':'Armenia','AUS':'Australia','AUT':'Austria','AZE':'Azerbaijan','BHS':'Bahamas','BHR':'Bahrain','BGD':'Bangladesh','BRB':'Barbados','BLR':'Belarus','BEL':'Belgium','BLZ':'Belize','BEN':'Benin','BTN':'Bhutan','BOL':'Bolivia','BIH':'Bosnia and Herzegovina','BWA':'Botswana','BRA':'Brazil','BRN':'Brunei Darussalam','BGR':'Bulgaria','BFA':'Burkina Faso','BDI':'Burundi','KHM':'Cambodia','CMR':'Cameroon','CAN':'Canada','CPV':'Cabo Verde','CAF':'Central African Republic','TCD':'Chad','CHL':'Chile','CHN':'China','COL':'Colombia','COM':'Comoros','COD':'Congo-Kinshasa','COG':'Congo-Brazzaville','CRI':'Costa Rica','CIV':'Côte d\'Ivoire','HRV':'Croatia','CUB':'Cuba','CYP':'Cyprus','CZE':'Czechia','DNK':'Denmark','DJI':'Djibouti','DMA':'Dominica','DOM':'Dominican Republic','ECU':'Ecuador','EGY':'Egypt','SLV':'El Salvador','GNQ':'Equatorial Guinea','ERI':'Eritrea','EST':'Estonia','ETH':'Ethiopia','FRO':'Faroe Islands','FSM':'Micronesia','FJI':'Fiji','FIN':'Finland','FRA':'France','GAB':'Gabon','GMB':'Gambia','GEO':'Georgia','DEU':'Germany','GHA':'Ghana','GRC':'Greece','GRL':'Greenland','GRD':'Grenada','GTM':'Guatemala','GIN':'Guinea','GNB':'Guinea-Bissau','GUY':'Guyana','HTI':'Haiti','HND':'Honduras','HUN':'Hungary','ISL':'Iceland','IND':'India','IDN':'Indonesia','IRN':'Iran','IRQ':'Iraq','IRL':'Ireland','ISR':'Israel','ITA':'Italy','JAM':'Jamaica','JPN':'Japan','JOR':'Jordan','KAZ':'Kazakhstan','KEN':'Kenya','KIR':'Kiribati','PRK':'North Korea','KOR':'South Korea','KWT':'Kuwait','KGZ':'Kyrgyzstan','LAO':'Lao','LVA':'Latvia','LBN':'Lebanon','LSO':'Lesotho','LBR':'Liberia','LBY':'Libya','LIE':'Liechtenstein','LTU':'Lithuania','LUX':'Luxembourg','MKD':'Republic of North Macedonia','MDG':'Madagascar','MWI':'Malawi','MYS':'Malaysia','MDV':'Maldives','MLI':'Mali','MLT':'Malta','MHL':'Marshall Islands','MRT':'Mauritania','MUS':'Mauritius','MEX':'Mexico','MDA':'Moldova','MCO':'Monaco','MNG':'Mongolia','MAR':'Morocco','MOZ':'Mozambique','MMR':'Myanmar','NAM':'Namibia','NPL':'Nepal','NLD':'Netherlands','NCL':'New Caledonia','NZL':'New Zealand','NIC':'Nicaragua','NER':'Niger','NGA':'Nigeria','MNP':'Northern Mariana Islands','NOR':'Norway','OMN':'Oman','PAK':'Pakistan','PLW':'Palau','PAN':'Panama','PNG':'Papua New Guinea','PRY':'Paraguay','PER':'Peru','PHL':'Philippines','POL':'Poland','PRT':'Portugal','PRI':'Puerto Rico','QAT':'Qatar','MNE':'Montenegro','SRB':'Serbia','ROU':'Romania','RUS':'Russian Federation','RWA':'Rwanda','WSM':'Samoa','STP':'Sao Tome and Principe','SAU':'Saudi Arabia','SEN':'Senegal','SYC':'Seychelles','SLE':'Sierra Leone','SGP':'Singapore','SVK':'Slovakia','SVN':'Slovenia','SLB':'Solomon Islands','SOM':'Somalia','ZAF':'South Africa','SSD':'South Sudan','ESP':'Spain','LKA':'Sri Lanka','KNA':'Saint Kitts and Nevis','LCA':'Saint Lucia','VCT':'Saint Vincent and the Grenadines','SDN':'Sudan','SUR':'Suriname','SWZ':'Eswatini','SWE':'Sweden','CHE':'Switzerland','SYR':'Syrian Arab Republic','TJK':'Tajikistan','TZA':'Tanzania','THA':'Thailand','TLS':'Timor-Leste','TGO':'Togo','TON':'Tonga','TTO':'Trinidad and Tobago','TUN':'Tunisia','TUR':'Turkey','TKM':'Turkmenistan','TUV':'Tuvalu','UGA':'Uganda','UKR':'Ukraine','ARE':'United Arab Emirates','GBR':'United Kingdom','USA':'United States of America','URY':'Uruguay','UZB':'Uzbekistan','VUT':'Vanuatu','VEN':'Venezuela','VNM':'Viet Nam','YEM':'Yemen','ZMB':'Zambia','ZWE':'Zimbabwe'};
// Use chroma to make the color scale.
const f = chroma.scale('RdYlBu').domain([scaleMax, 0, scaleMin]);
const margin = {top: 0, right: 0, bottom: 0, left: 0};
const width = window.innerWidth - margin.left - margin.right;
const height = window.innerHeight - margin.top - margin.bottom;
const xScale = d3.scaleLinear()
  .range([0, 200])
  .domain([-1, 119]);
const yScale = d3.scaleLinear()
  .range([40, 0])
  .domain([-1, 1]);

let scales = [], temperature = scaleMax, svg;
while (temperature > scaleMin) {
  temperature = temperature - 0.05;
  scales.push(temperature);
}
// Use this to run three different versions (fullscreen, square and portrait)
const videoMode = false;

class App extends Component {
  constructor(props) {
    super(props);

    // Define refs.
    this.containerRef = React.createRef();
    this.monthNamesContainerRef = React.createRef();
    this.searchContainerRef = React.createRef();
    this.controlsContainerRef = React.createRef();
    this.rangeContainerRef = React.createRef();

    // Define initial state.
    this.state = {
      active_country_id:null,
      active_country_name:'WORLD',
      active_country_temp:null,
      active_country_temp_line:avg_temps,
      controls_text:'Play',
      current_year_average_temp:null,
      expand:false,
      interval_play:false,
      search_text:'',
      year:yearStart
    }
  }
  componentDidMount() {
    // In video mode we want to remove controls.
    if (videoMode === true) {
      this.searchContainerRef.current.style.display = 'none';
      this.controlsContainerRef.current.style.display = 'none';
      this.rangeContainerRef.current.style.display = 'none';
    }
    svg = d3.select('.' + style.line_chart_container)
      .append('svg')
      .attr('height', height)
      .attr('width', width);
    // Get data.
    axios.get('./data/data.json')
    .then((response) => {
      this.setState((state, props) => ({
        current_data:response.data[yearStart],
        data:response.data
      }), () => this.showData());
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnMount() {

  }
  showData() {
    this.createLineChart();
    this.getCurrentYearAverageTemp();
    // Wait 2 seconds before starting the interval.
    setTimeout(() => {
      this.toggleInterval(yearStart);
    }, 2000);
  }
  toggleInterval(year) {
    if (parseInt(year) === yearEnd) {
      year = yearStart
    }
    // If interval is already running, stop it.
    if (this.state.interval === true) {
      clearInterval(interval);
      this.setState((state, props) => ({
        controls_text:'Play',
        interval:false,
      }));
    }
    else {
      // Start interval to loop through the years.
      interval = setInterval(() => {
        // If we are in the end.
        if (year > yearEnd) {
          clearInterval(interval);
          year = yearEnd;
          this.setState((state, props) => ({
            controls_text:'Play',
            interval:false
          }));
          // Only to create the different video versions, ignored otherwise.
          if (videoMode === true) {
            if (this.containerRef.current.style.width !== '100vh' && this.containerRef.current.style.width !== ((9 / 16 * 100) + 'vh')) {
              setTimeout(() => {
                this.setState((state, props) => ({
                  current_data:state.data[yearStart],
                  year:yearStart
                }), this.getCurrentYearAverageTemp);
                this.containerRef.current.style.width = '100vh';
                setTimeout(() => {
                  this.toggleInterval(yearStart);
                }, 2000);
              }, 2000);
            }
            else if (this.containerRef.current.style.width !== ((9 / 16 * 100) + 'vh')) {
              setTimeout(() => {
                this.setState((state, props) => ({
                  current_data:state.data[yearStart],
                  year:yearStart
                }), this.getCurrentYearAverageTemp);
                this.monthNamesContainerRef.current.style.fontSize = '20px';
                this.containerRef.current.style.width = (9 / 16 * 100) + 'vh';
                setTimeout(() => {
                  this.toggleInterval(yearStart);
                }, 2000);
              }, 2000);
            }
          }
        }
        else {
          // Set data for the next year.
          this.setState((state, props) => ({
            controls_text:'Pause',
            current_data:this.state.data[year],
            interval:true,
            year:year
          }), this.getCurrentYearAverageTemp);
        }
        year++;
      }, intervalTimeout);
    }
  }
  value2color(value) {
    // Return color from chroma based on value.
    return f(value);
  }
  createLineChart() {
    svg.select('.' + style.line_container).append('svg')
      .attr('height', '200px')
      .attr('width', '400px')
    const line_container = svg.append('g')
      .attr('class', style.line_container)
      .attr('transform', 'translate(' + (window.innerWidth - 300) + ', ' + (window.innerHeight - 75) + ')');
    line_container.append('text')
      .attr('x', 5)
      .attr('class', style.linegraptext)
      .html('world');
    line_container.append('g')
      .attr('class', style.grid)
      .call(d3.axisLeft(yScale)
        .ticks(1)
        .tickFormat(i => i + ' °C')
        .tickSizeInner(-200)
        .tickSizeOuter(0)
      );
    // Add the lines.
    line_container.append('path')
      .attr('class', style.current_avg_temp_line)
      .data([]);
  }
  updateLineChart() {
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));
    d3.select('.' + style.linegraptext).html(this.state.active_country_name);
    d3.select('.' + style.current_avg_temp_line)
      .attr('class', style.current_avg_temp_line)
      .style('stroke', '#000')
      .attr('d', line(this.state.active_country_temp_line.slice(0, this.state.year - 1901)));
  }
  getCurrentYearAverageTemp() {
    let temperature;
    this.updateLineChart();
    // If current country is selected.
    if (this.state.active_country_id !== null) {
      let temperature_line = [];
      for (let year = yearStart; year <= yearEnd; year++) {
        temperature_line.push(this.state.data[year].filter(obj => {
          return obj.country === this.state.active_country_name;
        }).map((obj) => {
          return obj.data.reduce((total, current) => total + current.value, 0) / obj.data.length
        }
        ));
      }
      temperature = this.state.current_data.filter(obj => {
        return obj.country === this.state.active_country_name;
      });
      temperature = temperature[0].data.reduce((total, current) => total + current.value, 0) / temperature[0].data.length;
      this.setState((state, props) => ({
        active_country_temp:temperature,
        active_country_temp_line:temperature_line,
        current_year_average_temp:temperature
      }));
    }
    // If current country is empty.
    else {
      // temperature = this.state.current_data.reduce((total, current) => total + (current.data.reduce((country_total, country_current) => country_total + country_current.value, 0)) / current.data.length, 0) / this.state.current_data.length;
      temperature = avg_temps[this.state.year - 1901];
      this.setState((state, props) => ({
        active_country_temp:temperature,
        active_country_temp_line:avg_temps,
        current_year_average_temp:temperature
      }));
    }
  }
  handleYearChange(event) {
    // If year is changed manually we stop the interval.
    clearInterval(interval);
    let year = event.target.value;
    this.setState((state, props) => ({
      controls_text:'Play',
      current_data:this.state.data[year],
      interval:false,
      year:year
    }), () => this.getCurrentYearAverageTemp());
  }
  handleCountryClick(data, i, status) {
    // If already clicked we want to expand.
    if (status === 'clicked') {
      this.setState((state, props) => ({
        expand:true
      }));
    }
    else {
      if (this.state.active_country_id === i) {
        this.setState((state, props) => ({
          active_country_id:null,
          active_country_name:'WORLD',
          expand:false,
          search_text:''
        }), () => this.getCurrentYearAverageTemp());
      }
      else {
        this.setState((state, props) => ({
          active_country_id:i,
          active_country_name:data.country,
          active_country_temp:data.data.reduce((total, current) => total + current.value, 0) / data.data.length,
          expand:false
        }), () => this.getCurrentYearAverageTemp());
      }
    }
  }
  handleSearchChange(event) {
    let country = Object.keys(countries).filter((key) => (countries[key] === event.target.value))[0] || event.target.value;
    this.setState((state, props) => ({
      search_text:country
    }));
    let temperature = this.state.current_data.filter(obj => {
      return obj.country === country;
    });
    if (temperature.length === 1) {
      this.setState((state, props) => ({
        active_country_id:Object.keys(countries).findIndex((el) => el === country),
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
    return (
      <div className={style.app} ref={this.containerRef}>
        <Div100vh>
          <div className={style.month_names_container} ref={this.monthNamesContainerRef}>
            {
              // Months at the top.
              monthNames.map((month, i) => {
                return (
                  <div key={i} className={style.month_name}>{month}</div>
                );
              })
            }
          </div>
          <div className={style.countries_container}>
            {
              // Print temperatues.
              this.state.current_data && this.state.current_data.map((data, i) => {
                let country_container_class;
                let status = '';
                if (this.state.expand === true) {
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
                  else if (this.state.active_country_id !== null) {
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
                        let title_second_line = data.country + ' ' + (month_data.value > 0 ? '+' : '') + month_data.value.toFixed(1) + ' °C';
                        return (
                          <div key={i} className={style.month_value} style={{backgroundColor:this.value2color(month_data.value)}}>
                            <span className={style.tooltiptext}>{title_first_line}<br />{title_second_line}</span>
                          </div>
                        );
                      })
                    }
                  </div>
                );
              })
            }
            <div className={style.meta_container}>
              <div className={style.info_container}>
                <h3>Temperature anomalies</h3>
                <div>World data: <a href="https://data.giss.nasa.gov/gistemp/">NASA</a></div>
                <div>Country data: <a href="https://climateknowledgeportal.worldbank.org/download-data">World Bank</a></div>
                <div>Author: <a href="https://twitter.com/teelmo">Teemo Tebest</a>, EBU</div>
                <div>Reference period: 1951–1980</div>
              </div>
              <div className={style.search_container} ref={this.searchContainerRef}>
                <input list="countries" type="text" placeholder="Search country…" value={(this.state.search_text !== 'ALL') ? this.state.search_text : ''} onChange={(event) => this.handleSearchChange(event)} />
                <datalist id="countries">
                  {
                    // Autocomplete data.
                    countries && Object.values(countries).map((country, i) => {
                      return (<option key={i} value={country} />);
                    })
                  }
                </datalist>
              </div>
              <div className={style.active_country_container}>
                <span className={style.active_country_name}>{this.state.active_country_name}</span>
                <span className={style.active_country_temp}>{this.state.active_country_temp !== null && (this.state.active_country_temp > 0 ? '+' : '') + this.state.active_country_temp.toFixed(1) + ' °C'}</span>
              </div>
              <div className={style.year_container}>{this.state.year}</div>
              <div className={style.range_container} ref={this.rangeContainerRef}>
                <input type="range" min={yearStart} value={this.state.year} max={yearEnd} onChange={(event) => this.handleYearChange(event)} />
              </div>
              <div className={style.controls_container} ref={this.controlsContainerRef} onClick={() => this.toggleInterval(this.state.year)}>{this.state.controls_text}</div>
            </div>
            <div className={style.line_chart_container}></div>
            <div className={style.scales_container}>
              {
                // The scale on the right.
                scales.map((scale, i) => {
                  // Place the yearly marker.
                  if (this.state.current_year_average_temp !== null && this.state.current_year_average_temp > scale  && this.state.current_year_average_temp < (scale + 0.05)) {
                    return (<div key={i} className={style.scale_container} style={{backgroundColor:'#fff'}}><div className={style.scale_text}><div className={style.year_text}>{this.state.year}</div><div>{(this.state.current_year_average_temp > 0 ? '+' : '') + this.state.current_year_average_temp.toFixed(1)} °C</div></div></div>);
                  }
                  // Place the zero point (disabled by css on default).
                  else if (scale > -0.025 && scale < 0.025) {
                    return (<div key={i} className={style.scale_container} style={{backgroundColor:this.value2color(scale), borderBottom:'1px dashed rgba(255, 255, 255, 0.3)'}}><div className={style.scale_text_zero}><div>0 °C</div></div></div>);
                  }
                  // Place the initial value.
                  else if (scale < -0.625 && scale > -0.675) {
                    return (<div key={i} className={style.scale_container} style={{backgroundColor:this.value2color(scale), borderBottom:'1px dashed rgba(255, 255, 255, 0.3)'}}><div className={style.scale_text_1901}><div>-0.6 °C</div></div></div>);
                  }
                  else {
                    return (<div key={i} className={style.scale_container} style={{backgroundColor:this.value2color(scale)}}></div>);
                  }
                })
              }
            </div>
          </div>
        </Div100vh>
      </div>
    );
  }
}
export default App;