import React from "react";
import moment from "moment";
import './pomodoroTimer.css'

const Header = () => <h1>Pomodoro Clock</h1>
const SetTimer = ({ type, value, handleClick }) => (
  <div className='SetTimer'>
    <div id={`${type}-label`}>{type === 'session' ? 'Session ' : 'Break '}Length</div>
    <div className='SetTimer-controls'>
      <button id={`${type}-decrement`} onClick={() => handleClick(false, `${type}Value`)}>&darr;</button>
      <h1 id={`${type}-length`}>{value}</h1>
      <button id={`${type}-increment`} onClick={() => handleClick(true, `${type}Value`)}>&uarr;</button>
    </div>
  </div>
)

const Timer = ({ mode, time}) => (
  <div className='Timer'>
    <h1 id='timer-label'>{mode === 'session' ? 'Session' : 'Break'}</h1>
    <h1 id='time-left'>{time}</h1>
  </div>
)

const Controls = ({ active, handleReset, handlePlayPause  }) => (
  <div className='Controls'>
    <button id='start_stop' onClick={handlePlayPause}>
      { active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span> }
    </button>
    <button id='reset' onClick={handleReset}>&#8635;</button>
  </div>
)

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakValue: 5,
      sessionValue: 25,
      mode: 'session',
      time: 25 * 60 * 1000,
      active: false,
      touched: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.mode === 'session') {
      this.setState({ time: this.state.breakValue * 60 * 1000, mode: 'break' })
      this.audio.play()
    }
    if (prevState.time === 0 && prevState.mode === 'break') {
      this.setState({ time: this.state.sessionValue * 60 * 1000, mode: 'session'})
      this.audio.play()
    }
  }

  handleSetTimers = (inc, type) => {
    if(this.state[type] ===  60 && inc) return
    if(this.state[type] === 1 && !inc) return
    this.setState({ [type]: this.state[type] + (inc ? 1 : -1) })
  }

  handleReset = () => {
    this.setState({ 
      breakValue: 5, 
      sessionValue: 25, 
      time: 25 * 60 * 1000,
      mode: 'session',
      touched: false,
      active: false
     })
    clearInterval(this.pomodoro)
    this.audio.pause()
    this.audio.currentTime = 0
  }

  handlePlayPause = () => {
    if(this.state.active) {
      clearInterval(this.pomodoro)
      this.setState({ active: false })
    } else {
      if (this.state.touched) {
        this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000}), 1000)
        this.setState({ active: true })
      } else {
        this.setState({ 
          time: this.state.sessionValue * 60 * 1000, 
          touched: true,
          active: true }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000}), 1000))
      }
      
    }
  }

   render() {
     return(
       <div>
         <Header/>
         <div className='settings'>
           <SetTimer type='break' value={this.state.breakValue} handleClick={this.handleSetTimers}/>
           <SetTimer type='session' value={this.state.sessionValue} handleClick={this.handleSetTimers}/>
         </div>
         <Timer mode={this.state.mode} time={moment(this.state.time).format('mm:ss')}/>
         <Controls 
          active={this.state.active} 
          handlePlayPause={this.handlePlayPause}
          handleReset={this.handleReset}/>
          <audio 
            id='beep' 
            src='https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3' 
            ref={el => this.audio = el}
            >
          </audio>
       </div>
     )
   } 
}

export default  PomodoroTimer;


// import React from "react";
// import moment from "moment";
// import './pomodoroTimer.css'
//   //amCHARTS///////////////////////////////////////////////////////////////////////////////////
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// am4core.useTheme(am4themes_animated);
//   //amCHARTS///////////////////////////////////////////////////////////////////////////////////
// var sessionValue;

// const Header = () => <h1>Pomodoro Clock</h1>
// const SetTimer = ({ type, value, handleClick }) => (
//   <div className='SetTimer'>
//     <div id={`${type}-label`}>{type === 'session' ? 'Session ' : 'Break '}Length</div>
//     <div className='SetTimer-controls'>
//       <button id={`${type}-decrement`} onClick={() => handleClick(false, `${type}Value`)}>&darr;</button>
//       <h1 id={`${type}-length`}>{value}</h1>
//       <button id={`${type}-increment`} onClick={() => handleClick(true, `${type}Value`)}>&uarr;</button>
//     </div>
//   </div>
// )

// const Timer = ({ mode, time}) => (
//   <div className='Timer'>
//     <h1 id='timer-label'>{mode === 'session' ? 'Session' : 'Break'}</h1>
//     <h1 id='time-left'>{time}</h1>
//   </div>
// )

// const Controls = ({ active, handleReset, handlePlayPause  }) => (
//   <div className='Controls'>
//     <button id='start_stop' onClick={handlePlayPause}>
//       { active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span> }
//     </button>
//     <button id='reset' onClick={handleReset}>&#8635;</button>
//   </div>
// )

// class PomodoroTimer extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       breakValue: 5,
//       sessionValue: 25,
//       mode: 'session',
//       time: 25 * 60 * 1000,
//       active: false,
//       touched: false
//     }
//     sessionValue=this.state.sessionValue;
//     console.log(sessionValue);
    
//   }
//   //amCHARTS///////////////////////////////////////////////////////////////////////////////////
//   componentDidMount() {
//     let chart = am4core.create("chartdiv", am4charts.XYChart);

//   am4core.ready(function() {

//   // Themes begin
//   am4core.useTheme(am4themes_animated);
//   // Themes end

//   // create chart
//   var chart = am4core.create("chartdiv", am4charts.GaugeChart);
//   chart.innerRadius = am4core.percent(82);

//   /**
//    * Normal axis
//    */

//   var axis = chart.xAxes.push(new am4charts.ValueAxis());
//   axis.min = 0;
//   axis.max = 100;
//   axis.strictMinMax = true;
//   axis.renderer.radius = am4core.percent(80);
//   axis.renderer.inside = true;
//   axis.renderer.line.strokeOpacity = 1;
//   axis.renderer.ticks.template.disabled = false
//   axis.renderer.ticks.template.strokeOpacity = 1;
//   axis.renderer.ticks.template.length = 10;
//   axis.renderer.grid.template.disabled = true;
//   axis.renderer.labels.template.radius = 40;
//   axis.renderer.labels.template.adapter.add("text", function(text) {
//     return text + "%";
//   })

//   /**
//    * Axis for ranges
//    */

//   var colorSet = new am4core.ColorSet();

//   var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
//   axis2.min = 0;
//   axis2.max = 100;
//   axis2.renderer.innerRadius = 10
//   axis2.strictMinMax = true;
//   axis2.renderer.labels.template.disabled = true;
//   axis2.renderer.ticks.template.disabled = true;
//   axis2.renderer.grid.template.disabled = true;

//   var range0 = axis2.axisRanges.create();
//   range0.value = 0;
//   range0.endValue = 100;
//   range0.axisFill.fillOpacity = 1;
//   range0.axisFill.fill = colorSet.getIndex(0);

//   var range1 = axis2.axisRanges.create();
//   range1.value = 0;
//   range1.endValue = 100;
//   range1.axisFill.fillOpacity = 1;
//   range1.axisFill.fill = colorSet.getIndex(2);

//   /**
//    * Label
//    */

//   var label = chart.radarContainer.createChild(am4core.Label);
//   label.isMeasured = false;
//   label.fontSize = 45;
//   label.x = am4core.percent(50);
//   label.y = am4core.percent(100);
//   label.horizontalCenter = "middle";
//   label.verticalCenter = "bottom";
//   label.text = "50%";


//   /**
//    * Hand
//    */

//   var hand = chart.hands.push(new am4charts.ClockHand());
//   hand.axis = axis2;
//   hand.innerRadius = am4core.percent(20);
//   hand.startWidth = 10;
//   hand.pin.disabled = true;
//   hand.value = 100;

//   hand.events.on("propertychanged", function(ev) {
//     range0.endValue = ev.target.value;
//     range1.value = ev.target.value;
//     label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
//     axis2.invalidate();
//   });

//   setInterval(function(props) {
//     console.log(sessionValue);
    
//     var value = sessionValue - ;
//     // var value = Math.round(Math.random() * 100);

//     var animation = new am4core.Animation(hand, {
//       property: "value",
//       to: value
//     }, 1000, am4core.ease.cubicOut).start();
//   }, 2000);

//   }); // end am4core.ready()
//       this.chart = chart;
//   }
//     //amCHARTS///////////////////////////////////////////////////////////////////////////////////


//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.time === 0 && prevState.mode === 'session') {
//       this.setState({ time: this.state.breakValue * 60 * 1000, mode: 'break' })
//       this.audio.play()
//     }
//     if (prevState.time === 0 && prevState.mode === 'break') {
//       this.setState({ time: this.state.sessionValue * 60 * 1000, mode: 'session'})
//       this.audio.play()
//     }
//   }

//   handleSetTimers = (inc, type) => {
//     if(this.state[type] ===  60 && inc) return
//     if(this.state[type] === 1 && !inc) return
//     this.setState({ [type]: this.state[type] + (inc ? 1 : -1) })
//   }

//   handleReset = () => {
//     this.setState({ 
//       breakValue: 5, 
//       sessionValue: 25, 
//       time: 25 * 60 * 1000,
//       mode: 'session',
//       touched: false,
//       active: false
//      })
//     clearInterval(this.pomodoro)
//     this.audio.pause()
//     this.audio.currentTime = 0
//   }

//   handlePlayPause = () => {
//     if(this.state.active) {
//       clearInterval(this.pomodoro)
//       this.setState({ active: false })
//     } else {
//       if (this.state.touched) {
//         this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000}), 1000)
//         this.setState({ active: true })
//       } else {
//         this.setState({ 
//           time: this.state.sessionValue * 60 * 1000, 
//           touched: true,
//           active: true }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000}), 1000,))
//       }
      
//     }
//   }

  
//   //amCHARTS////////////////////////////////////////////
//   componentWillUnmount() {
//     if (this.chart) {
//       this.chart.dispose();
//     }
//   }
//   //amCHARTS////////////////////////////////////////////

//    render() {
//      return(
//        <div>
//          <Header/>
//          <div className='settings'>
//            <SetTimer type='break' value={this.state.breakValue} handleClick={this.handleSetTimers}/>
//            <SetTimer type='session' value={this.state.sessionValue} handleClick={this.handleSetTimers}/>
//          </div>
//          <Timer mode={this.state.mode} time={moment(this.state.time).format('mm:ss')}/>
//             {  //amCHARTS///////////////////////////////////////////////////////////////////////////////////
// }
//          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
//                   {  //amCHARTS///////////////////////////////////////////////////////////////////////////////////
// }

//          <Controls 
//           active={this.state.active} 
//           handlePlayPause={this.handlePlayPause}
//           handleReset={this.handleReset}/>
//           <audio 
//             id='beep' 
//             src='https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3' 
//             ref={el => this.audio = el}
//             >
//           </audio>
//        </div>
//      )
//    } 
// }

// export default  PomodoroTimer;