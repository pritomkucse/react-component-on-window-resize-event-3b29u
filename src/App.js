import React from "react";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    // we will update below state variables to tell react component
    // to update, only state or props change can update react component
    this.state = {
      width: 0,
      height: 0
    };

    // we will use this timer to less fire resize event
    // practially we will fire resize event 500 miliseconds after
    this.timer = null;

    // we will catch windows resize event into below function
    this.windowResized = this.windowResized.bind(this);

    // we will handle resize event so resize event will
    // be in some time interval, less freequent
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.windowResized);
    this.updateWindowWidth();
  }

  componentDidUpdate() {
    console.log(
      `Window width/height changed to ${this.state.width}X${this.state.height}`
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResized);
  }

  updateWindowWidth() {
    let _this = this;
    setTimeout(function() {
      _this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }

  windowResized() {
    let _this = this;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function() {
      _this.updateWindowWidth();
    }, 500);
  }

  render() {
    return (
      <div className="App">
        <h1>
          WINDOW WIDTH={this.state.width}, HEIGHT={this.state.height}
        </h1>
      </div>
    );
  }
}

export default App;
