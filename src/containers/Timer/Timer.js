import React, { Component, Fragment, useState } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Button from "../../components/Buttons/Button";
import Label from "../../components/Labels/Label";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';



const minuteSeconds = 120;


    const timerProps = {
      isPlaying: true,
      size: 120,
      strokeWidth: 6
    };
    
    const renderTime = (dimension, time) => {
      return (
        <div className="time-wrapper">
          <div className="time">{time}</div>
          <div>{dimension}</div>
        </div>
      );
    };
    
    type Props = {
        startTimeInSeconds: number;
      }
      type State = {
        timeRemainingInSeconds: number;
      }
    const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
    
    const UrgeWithPleasureComponent = () => (
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    );
    const App = () => {
        const [progress, setProgress] = useState(0);
        const [color, setColor] = useState('');
        const colorArray = ['#7ea9e1', "#ed004f", "#00fcf0", "#d2fc00", "#7bff00", "#fa6900"];
      
        const randomColor = () => {
          return colorArray[Math.floor(Math.random() * colorArray.length)];
        }
      
        const randomProgressValue = () => {
          const progressValue = Math.floor(Math.random() * 101);
          setProgress(progressValue);
          const randomProgressColor = randomColor();
          setColor(randomProgressColor);
        }
      
        const onChange = e => {
          if (e.target.value) {
            if (e.target.value > 100) {
              progress = 100;
            }
            if (e.target.value < 0) {
                progress = 0;
            }
            setProgress(progress);
            const randomProgressColor = randomColor();
            setColor(randomProgressColor);
          } else {
            setProgress(0);
          }
        }
      
        return (
          <div className="app">
            <div className="app-header">
              <h1>SVG Circle Progress</h1>
              <ProgressBar 
                progress={progress}
                size={500}
                strokeWidth={15}
                circleOneStroke='#d9edfe'
                circleTwoStroke={color}
              />
              <p>
                <input
                  type="number"
                  name="percent"
                  placeholder="Add Progress Value"
                  onChange={onChange}
                />
              </p>
              <button onClick={randomProgressValue}>
                Random
              </button>
            </div>
          </div>
        );
      }
      
    
    
      const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
      const endTime = stratTime + 243248; // use UNIX timestamp in seconds
    
      const remainingTime = endTime - stratTime;

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { time: { h: 0, m: 0, s: 0 }, seconds: 0, laps: [] };

        this.timer = 0;

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.lapTimer = this.lapTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.incTimer = this.incTimer.bind(this);
        this.decTimer = this.decTimer.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    }

    incTimer() {
        if (this.state.seconds >= 0)
            this.setState((prevState) => ({
                seconds: prevState.seconds + 60,
                time: this.secondsToTime(prevState.seconds + 60),
            }));
    }

    decTimer() {
        if (this.state.seconds > 61 || this.timer === 0)
            this.setState((prevState) => ({
                seconds: prevState.seconds - 60,
                time: this.secondsToTime(prevState.seconds - 60),
            }));
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Removing a sec and setting state to re-render
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero
        if (seconds === 0) {
            clearInterval(this.timer);
            this.setState({
                time: { h: 0, m: 0, s: 0 },
                seconds: 0,
            });
        }
    }

    stopTimer() {
        if (this.timer !== 0 && this.state.seconds !== 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    lapTimer() {
        if (this.timer !== 0 && this.state.seconds !== 0) {
            const newLaps = [...this.state.laps];

            this.setState((prevState) => {
                return {
                    laps: newLaps.concat(prevState.time),
                };
            });
        }
    }

    removeLap(id) {
        const laps = this.state.laps;
        this.setState({ laps: laps.filter((item, index) => index !== id) });
    }

    resetTimer() {
        this.setState({
            time: { h: 0, m: 0, s: 0 },
            seconds: 0,
            laps: [],
        });

        if (this.timer !== 0) {
            clearInterval(this.timer);
        }
    }
       
    
      
        
      
    timeFormatter(time) {
        let { h, m, s } = time;

        if (h.toString().length < 2) h = `0${h}`;

        if (m.toString().length < 2) m = `0${m}`;

        if (s.toString().length < 2) s = `0${s}`;

        return { h, m, s };
    }

    render() {
        let { h, m, s } = this.timeFormatter(this.state.time);
        let laps = null;

        if (this.state.laps.length !== 0)
            laps = this.state.laps.map((lap, id) => {
                let { h, m, s } = this.timeFormatter(lap);
                return <Label clicked={() => this.removeLap(id)} key={id} lapTime={`${h}:${m}:${s}`} />;
            });

        return (
            <Fragment>
                <div className="container mt-4 flex flex-col">
                    <div className="mx-auto py-4">
                        <span className="text-6xl">
                            {m}:{s}
                        </span>
                        <div>
                        <Button clicked={this.incTimer}>+</Button>
                        <Button clicked={this.decTimer}>-</Button>
                        <Button clicked={this.startTimer}>Start</Button>
                        </div>
                    </div>
                   
                    <div className="mx-auto py-6 mt-4 flex flex-row space-x-5">
                    
                    

                  
                        
                   
                        <Button clicked={this.stopTimer}>Stop</Button>
                        <Button clicked={this.resetTimer}>Reset</Button>                        
                    </div>
                </div>
                <div className="container py-6">{laps}</div>
            </Fragment>
        );
    }
}

export default Timer;
