const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const butts = {
  Q: { d: "Heater-1", u: "Heater-1" },
  W: { d: "Heater-2", u: "Heater-2" },
  E: { d: "Heater-3", u: "Heater-3" },
  A: { d: "Heater-4", u: "Heater-4_1" },
  S: { d: "Clap", u: "Heater-6" },
  D: { d: "Open-HH", u: "Dsc_Oh" },
  Z: { d: "Kick-n'-Hat", u: "Kick_n_Hat" },
  X: { d: "Kick", u: "RP4_KICK_1" },
  C: { d: "Closed-HH", u: "Cev_H2" },
};

const Header = () => (
  <div className='title'>
    <h2>Drum Machine</h2>
    <div className='underline'></div>
  </div>
);

class DrumMachine extends React.Component {
  constructor() {
    super();
    this.state = { dTxt: "tap!" };
  }
  keyListen({ key, altKey, ctrlKey }) {
    key = key.toUpperCase();
    if (!altKey && !ctrlKey && keys.includes(key)) {
      document.getElementById(`bank${key}`).click();
    }
  }
  padClick = ({ currentTarget: tgt }) => {
    this.setState({ dTxt: tgt.dataset.txt });
    tgt.focus();
    tgt
      .querySelector("audio")
      .play()
      .then(() => {
        tgt.blur();
      });
  };
  componentDidMount() {
    document.addEventListener("keydown", this.keyListen);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyListen);
  }
  render() {
    return (
      <div className='drum-machine' id='drum-machine'>
        <section id='display' className='display'>
          {this.state.dTxt}
        </section>
        <section className='triggers'>
          {Object.entries(butts).map(([k, { d, u }], i) => (
            <button
              type='button'
              id={`bank${k}`}
              className='btn drum-pad'
              data-txt={d}
              key={i}
              onClick={this.padClick}
            >
              {k}
              <audio
                preload='auto'
                id={k}
                className='clip'
                src={`https://s3.amazonaws.com/freecodecamp/drums/${u}.mp3`}
              />
            </button>
          ))}
        </section>
      </div>
    );
  }
}

const App = () => (
  <section className='container'>
    <Header />
    <DrumMachine />
  </section>
);

ReactDOM.render(<App />, document.getElementById("root"));
