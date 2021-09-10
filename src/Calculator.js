import React from "react";
import chroma from "chroma-js";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hex1: "First HEX",
      hex2: "Second HEX",
      result: "?",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    // transform hex's to lch's
    let lch1 = chroma(this.state.hex1).lch();
    let lch2 = chroma(this.state.hex2).lch();

    // get differences
    let result = lch1.map(function (num, i) {
      return num - lch2[i];
    });

    console.log(result);

    // lch(from hex1 -20.095281554789977, -72.33231061331429, 0.19841406746820667)

    this.setState({
      result: result,
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Primary HEX:
            <input
              type="text"
              name="hex1"
              value={this.state.hex1}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Secondary HEX:
            <input
              type="text"
              name="hex2"
              value={this.state.hex2}
              onChange={this.handleChange}
            />
          </label>
          <input className="Button" type="submit" value="Submit" />
        </form>
        <p classname="Result">{this.state.result}</p>
      </div>
    );
  }
}

export default Calculator;
