const mainButtons = [
  { val: "9", id: "nine" },
  { val: "8", id: "eight" },
  { val: "7", id: "seven" },
  { val: "6", id: "six" },
  { val: "5", id: "five" },
  { val: "4", id: "four" },
  { val: "3", id: "three" },
  { val: "2", id: "two" },
  { val: "1", id: "one" }
];

function evaluate(someExpression) {
  // IF MORE THAN ONE CONSECUTIVE OPERATOR, DO LAST ONE ONLY, UNLESS IT'S '-' SIGN
    // 5*-+5 SHOULD EQUAL 10
  let newExpression = someExpression.replace("--","+");
  //console.log("\tNEW EXPRESSION: " + newExpression);
  let matches = newExpression.match(/([/\*\+\-]{2,})*(?=[\.0-9]+)/g);
  matches.map(m => {
    //console.log("\tMATCH: " + m);
    newExpression = newExpression.replace(m, m.slice(-1) == '-' ? m.slice(-2) : m.slice(-1));
  });
  //console.log("\tCONSOLIDATED EXPRESSION: " + newExpression);
  let result = eval(newExpression);
  //console.log("\t\tEVALUATION: " + result);
  return eval(newExpression);
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "0",
      onResult: false
    };
    this.handleClick = this.handleClick.bind(this);
  } // END CONSTRUCTOR

  handleClick(e) {
    //console.log("BUTTON CLICKED: " + e.target.innerHTML);
    let val = e.target.innerHTML;
    switch (val) {
      case "AC":
        //console.log("CLEARING");
        this.setState({
          displayText: "0"
        });
        break;
      case "=":
        //console.log("EVALUATING: " + this.state.displayText);
        let result = evaluate(this.state.displayText);
        this.setState({
          displayText: result,
          onResult: true
        });
        break;
      case ".":
        if (!this.state.displayText.includes(".") || /[/\*\-\+/]/.test(this.state.displayText.substring(this.state.displayText.lastIndexOf("."),this.state.displayText.length))) {
          this.setState({
            displayText: this.state.displayText + "."
          });
        }
        break;
      default:
        if (this.state.onResult && /[/\*\-\+/]/.test(val)) {
          this.setState({
            displayText: this.state.displayText + val,
            onResult: false
          });
        }
        else if (this.state.onResult) {
          this.setState({
            displayText: val,
            onResult: false
          });
        }
        else if (this.state.displayText == "0" && val != ".") {
          this.setState({
            displayText: val
          });
        } 
        else {
          this.setState({
            displayText: this.state.displayText + val
          });
        }
    } // END SWITCH
  }

  render() {
    return (
      <div id="calc-body">
        <input id="display" value={this.state.displayText} />
        <div id="button-grids">
          <div id="left-side">
            <div id="top-row">
              <button
                className="calc-button"
                onClick={this.handleClick}
                id="clear"
              >
                AC
              </button>
              <button
                className="calc-button blackButton"
                onClick={this.handleClick}
                id="divide"
              >
                /
              </button>
            </div>
            <div id="main-grid">
              {mainButtons.map((button) => (
                <button
                  className="calc-button"
                  onClick={this.handleClick}
                  id={button.id}
                >
                  {button.val}
                </button>
              ))}
            </div>
            <div id="bottom-row">
              <button
                className="calc-button"
                onClick={this.handleClick}
                id="zero"
              >
                0
              </button>
              <button
                className="calc-button"
                onClick={this.handleClick}
                id="decimal"
              >
                .
              </button>
            </div>
          </div>
          <div id="right-side">
            <div id="last-col">
              <button
                className="calc-button blackButton"
                onClick={this.handleClick}
                id="multiply"
              >
                *
              </button>
              <button
                className="calc-button blackButton"
                onClick={this.handleClick}
                id="subtract"
              >
                -
              </button>
              <button
                className="calc-button blackButton"
                onClick={this.handleClick}
                id="add"
              >
                +
              </button>
              <button
                className="calc-button"
                onClick={this.handleClick}
                id="equals"
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    ); // END RETURN
  } // END RENDER
} // END CLASS DEFINITION

const root = ReactDOM.createRoot(document.getElementById("main-doc"));
root.render(<Calculator />);
