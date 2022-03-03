import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const interval = (func, time) => {
  let cancel;
  let next;
  let timeout;
  let holder;

  next = new Date().getTime() + time;
  timeout = null;

  holder = () => {
    next += time;
    timeout = setTimeout(holder, next - new Date().getTime());

    return func();
  };

  cancel = () => {
    return clearTimeout(timeout);
  };

  timeout = setTimeout(holder, next - new Date().getTime());
  return {
    cancel: cancel,
  };
};

// COMPONENTS:
class CtrlTimer extends React.Component {
  render() {
    return (
      <div className='controls'>
        <div id={this.props.titleID}>{this.props.title}</div>
        <button
          className='btn'
          id={this.props.minID}
          onClick={this.props.onClick}
          value='-'
        >
          <i className='fa fa-arrow-down' />
        </button>
        <div className='timers' id={this.props.lengthID}>
          {this.props.length}
        </div>
        <button
          className='btn'
          id={this.props.addID}
          onClick={this.props.onClick}
          value='+'
        >
          <i className='fa fa-arrow-up' />
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bLength: 5,
      sLength: 25,
      timerState: "stopped",
      mode: "Session",
      timer: 1500,
      intervalID: "",
    };
  }

  setBreak = (e) => {
    this.ctrlLength(
      "bLength",
      e.currentTarget.value,
      this.state.bLength,
      "Session",
    );
  };

  setSessionssionLen = (e) => {
    this.ctrlLength(
      "sLength",
      e.currentTarget.value,
      this.state.sLength,
      "Break",
    );
  };

  ctrlLength = (changeState, incdec, nowLength, mode) => {
    if (this.state.timerState === "running") {
      return;
    }

    if (this.state.mode === mode) {
      if (incdec === "-" && nowLength !== 1) {
        this.setState({ [changeState]: nowLength - 1 });
      } else if (incdec === "+" && nowLength !== 60) {
        this.setState({ [changeState]: nowLength + 1 });
      }
    } else if (incdec === "-" && nowLength !== 1) {
      this.setState({
        [changeState]: nowLength - 1,
        timer: nowLength * 60 - 60,
      });
    } else if (incdec === "+" && nowLength !== 60) {
      this.setState({
        [changeState]: nowLength + 1,
        timer: nowLength * 60 + 60,
      });
    }
  };

  ctrlTimer = () => {
    if (this.state.timerState === "stopped") {
      this.begin();
      this.setState({ timerState: "running" });
    } else {
      this.setState({ timerState: "stopped" });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  };

  begin = () => {
    this.setState({
      intervalID: interval(() => {
        this.decrement();
        this.ctrlMode();
      }, 1000),
    });
  };

  decrement = () => {
    this.setState({ timer: this.state.timer - 1 });
  };

  ctrlMode = () => {
    let timer = this.state.timer;
    this.danger(timer);
    this.beep(timer);
    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.mode === "Session") {
        this.begin();
        this.modeSwitch(this.state.bLength * 60, "Break");
      } else {
        this.begin();
        this.modeSwitch(this.state.sLength * 60, "");
      }
    }
  };

  danger = (_timer) => {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: "#920404" } });
    } else {
      this.setState({ alarmColor: { color: "#e5f3d7" } });
    }
  };

  beep = (_timer) => {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  };

  modeSwitch = (num, str) => {
    this.setState({
      timer: num,
      mode: str,
      alarmColor: { color: "white" },
    });
  };

  getclock = () => {
    let mins = Math.floor(this.state.timer / 60);
    let secs = this.state.timer - mins * 60;
    secs = secs < 10 ? "0" + secs : secs;
    mins = mins < 10 ? "0" + mins : mins;
    return mins + ":" + secs;
  };

  reset = () => {
    this.setState({
      bLength: 5,
      sLength: 25,
      timerState: "stopped",
      mode: "Session",
      timer: 1500,
      intervalID: "",
      alarmColor: { color: "#e5f3d7" },
    });

    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  render() {
    return (
      <div>
        <CtrlTimer
          addID='break-increment'
          length={this.state.bLength}
          lengthID='break-length'
          minID='break-decrement'
          onClick={this.setBreak}
          titleID='break-label'
          title='Break'
        />

        <CtrlTimer
          addID='session-increment'
          length={this.state.sLength}
          lengthID='session-length'
          minID='session-decrement'
          onClick={this.setSessionssionLen}
          titleID='session-label'
          title='Session'
        />

        <div className='timer' style={this.state.alarmColor}>
          <div id='timer-label'>{this.state.mode}</div>
          <div id='time-left'>{this.getclock()}</div>
        </div>

        <div>
          <button id='start_stop' className='ctrlbtn' onClick={this.ctrlTimer}>
            <i className='fa fa-play fa-2x' />
            <i className='fa fa-pause fa-2x' />
          </button>
          <button id='reset' className='ctrlbtn' onClick={this.reset}>
            <i className='fa fa-refresh fa-2x' />
          </button>
        </div>

        <audio
          id='beep'
          preload='auto'
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("pomodoro"));
