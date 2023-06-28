const mainButtons = [
{ val: "9", id: "nine" },
{ val: "8", id: "eight" },
{ val: "7", id: "seven" },
{ val: "6", id: "six" },
{ val: "5", id: "five" },
{ val: "4", id: "four" },
{ val: "3", id: "three" },
{ val: "2", id: "two" },
{ val: "1", id: "one" }];


function evaluate(someExpression) {
  // IF MORE THAN ONE CONSECUTIVE OPERATOR, DO LAST ONE ONLY, UNLESS IT'S '-' SIGN
  // 5*-+5 SHOULD EQUAL 10
  let newExpression = someExpression.replace("--", "+");
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
      onResult: false };

    this.handleClick = this.handleClick.bind(this);
  } // END CONSTRUCTOR

  handleClick(e) {
    //console.log("BUTTON CLICKED: " + e.target.innerHTML);
    let val = e.target.innerHTML;
    switch (val) {
      case "AC":
        //console.log("CLEARING");
        this.setState({
          displayText: "0" });

        break;
      case "=":
        //console.log("EVALUATING: " + this.state.displayText);
        let result = evaluate(this.state.displayText);
        this.setState({
          displayText: result,
          onResult: true });

        break;
      case ".":
        if (!this.state.displayText.includes(".") || /[/\*\-\+/]/.test(this.state.displayText.substring(this.state.displayText.lastIndexOf("."), this.state.displayText.length))) {
          this.setState({
            displayText: this.state.displayText + "." });

        }
        break;
      default:
        if (this.state.onResult && /[/\*\-\+/]/.test(val)) {
          this.setState({
            displayText: this.state.displayText + val,
            onResult: false });

        } else
        if (this.state.onResult) {
          this.setState({
            displayText: val,
            onResult: false });

        } else
        if (this.state.displayText == "0" && val != ".") {
          this.setState({
            displayText: val });

        } else
        {
          this.setState({
            displayText: this.state.displayText + val });

        }}
    // END SWITCH
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "calc-body" }, /*#__PURE__*/
      React.createElement("input", { id: "display", value: this.state.displayText }), /*#__PURE__*/
      React.createElement("div", { id: "button-grids" }, /*#__PURE__*/
      React.createElement("div", { id: "left-side" }, /*#__PURE__*/
      React.createElement("div", { id: "top-row" }, /*#__PURE__*/
      React.createElement("button", {
        className: "calc-button",
        onClick: this.handleClick,
        id: "clear" }, "AC"), /*#__PURE__*/



      React.createElement("button", {
        className: "calc-button blackButton",
        onClick: this.handleClick,
        id: "divide" }, "/")), /*#__PURE__*/




      React.createElement("div", { id: "main-grid" },
      mainButtons.map((button) => /*#__PURE__*/
      React.createElement("button", {
        className: "calc-button",
        onClick: this.handleClick,
        id: button.id },

      button.val))), /*#__PURE__*/



      React.createElement("div", { id: "bottom-row" }, /*#__PURE__*/
      React.createElement("button", {
        className: "calc-button",
        onClick: this.handleClick,
        id: "zero" }, "0"), /*#__PURE__*/



      React.createElement("button", {
        className: "calc-button",
        onClick: this.handleClick,
        id: "decimal" }, "."))), /*#__PURE__*/





      React.createElement("div", { id: "right-side" }, /*#__PURE__*/
      React.createElement("div", { id: "last-col" }, /*#__PURE__*/
      React.createElement("button", {
        className: "calc-button blackButton",
        onClick: this.handleClick,
        id: "multiply" }, "*"), /*#__PURE__*/



      React.createElement("button", {
        className: "calc-button blackButton",
        onClick: this.handleClick,
        id: "subtract" }, "-"), /*#__PURE__*/



      React.createElement("button", {
        className: "calc-button blackButton",
        onClick: this.handleClick,
        id: "add" }, "+"), /*#__PURE__*/



      React.createElement("button", {
        className: "calc-button",
        onClick: this.handleClick,
        id: "equals" }, "="))))));







    // END RETURN
  } // END RENDER
} // END CLASS DEFINITION

const root = ReactDOM.createRoot(document.getElementById("main-doc"));
root.render( /*#__PURE__*/React.createElement(Calculator, null));