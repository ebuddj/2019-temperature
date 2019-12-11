import React, {Component} from 'react';
import style from './../styles/styles.less';

// https://alligator.io/react/axios-react/
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  componentDidMount() {
    let self = this;
    axios.get('./data/data.json', {
    })
    .then(function (response) {
      self.setState((state, props) => ({
        data:response.data
      }), self.showData);
    });
    
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnMount() {

  }
  showData() {
    let self = this;
    const start_year = 1901;
    const end_year = 2016;
    let year = start_year;
    let interval = setInterval(() => {
      if (year > end_year) {
        clearInterval(interval);
        year = start_year;
      }
      else {
        self.setState((state, props) => ({
          current_data:this.state.data[year],
          year:year
        }));
      }
      year++;
    }, 200);
  }
  // shouldComponentUpdate(nextProps, nextState) {}
  // static getDerivedStateFromProps(props, state) {}
  // getSnapshotBeforeUpdate(prevProps, prevState) {}
  // static getDerivedStateFromError(error) {}
  // componentDidCatch() {}
  render() {
    function value2color(value,min,max) {
      if (value > max) {
        value = max;
      }
      if (value < min) {
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
      let r = 0;
      let g = 0;
      let b = 0;
      if (value < 50) {
        r = 255;
        b = Math.round(5.1 * value);
      }
      else {
        b = 255;
        r = Math.round(510 - 5.10 * value);
      }
      var h = r * 0x10000 + g * 0x100 + b * 0x1;
      return '#' + ('000000' + h.toString(16)).slice(-6);
    }
    return (
      <div className={style.app}>
        <h3>{this.state.year}</h3>
        {
          this.state.current_data && this.state.current_data.map((data, i) => {
            return (
                <div key={i} className={style.country_container}>
                  <div className={style.country_name}>{data.country}</div>
                  {
                    data.data.map((month_data, i) => {
                      return (
                        <div 
                          key={i} 
                          style={{backgroundColor:value2color(month_data.value,-2,2)}}
                          className={style.month_value} 
                          title={month_data.value}></div>
                      );
                    })
                  }
                </div>
            );
          })
        }
      </div>
    );
  }
}
export default App;