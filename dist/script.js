const Calculator = () => {
  const [state, setState] = React.useState({
    display: "0",
    isLocked: false });


  if (state.display === "NaN" || state.display === "Infinity") {
    setState({
      display: `Error: ${state.display}`,
      isLocked: true });

    setTimeout(() => {
      setState({
        display: "0",
        isLocked: false });

    }, 1500);
  }

  function calculate(a, b, operation) {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return b - a;
      case "×":
        return a * b;
      case "÷":
        return b / a;}

  }

  function onClickHandler(action) {
    const display = state.display;
    const isLocked = state.isLocked;
    const last = display.slice(-1);
    if (!isLocked) {
      switch (action) {
        case "AC":
          setState({
            display: "0" });

          break;
        case "⬅":
          setState({
            display: display.slice(0, -1) });

          break;
        case ".":
          if (/\d+\.\d*$/.test(state.display)) {
            break;
          } else if (!/\d/.test(last)) {
            setState({ display: display + "0." });
          } else {
            setState({ display: display + "." });
          }
          break;
        case "+":
        case "-":
        case "×":
        case "÷":
          if (/[\d]/.test(last)) {
            setState({ display: display + action });
          } else if (/\d/.test(display.slice(-2))) {
            setState({
              display:
              action !== "-" ?
              display.slice(0, -1) + action :
              last === "-" ?
              display.slice(0, -1) + "+" :
              display + action });

          } else setState({ display: display.slice(0, -2) + action });
          break;
        case "=":
          let formel = display;
          const condition = (str) =>
          str.length <= 1 &&
          ["", "+", "-", "×", "÷"].some(el => str.includes(el));
          if (condition(formel)) return;
          while (!/[\d]/.test(formel[formel.length - 1])) {
            formel = formel.slice(0, -1);
          }

          const numbers = [];
          let currentNumber = "";
          const ops = [];

          for (let i = 0; i < formel.length; i++) {
            if (formel[i] === "-" && currentNumber === "") {
              currentNumber = "-";
            } else if (/[\d.]/.test(formel[i])) {
              currentNumber = currentNumber + formel[i];
            } else {
              if (currentNumber !== "") {
                numbers.push(Number(currentNumber));
                currentNumber = "";
              }
              while (
              ops.length > 0 &&
              !(
              (ops[ops.length - 1] === "-" ||
              ops[ops.length - 1] === "+") && (
              formel[i] === "×" || formel[i] === "÷")))

              {
                numbers.push(
                calculate(numbers.pop(), numbers.pop(), ops.pop()));

              }
              ops.push(formel[i]);
            }
          }
          if (currentNumber !== "") {
            numbers.push(Number(currentNumber));
            currentNumber = "";
          }
          while (ops.length) {
            numbers.push(calculate(numbers.pop(), numbers.pop(), ops.pop()));
          }

          const result = numbers.pop();
          setState({
            display: "" + result + "" });

          break;
        default:
          setState({
            display: /([^.0-9]0|^0)$/.test(display) ?
            display.slice(0, -1) + action :
            display + action });

          break;}

    }
  }

  return /*#__PURE__*/(
    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("div", { className: "phone" }, /*#__PURE__*/
    React.createElement("div", { className: "phone-btns" }), /*#__PURE__*/
    React.createElement("div", { className: "camera" }), /*#__PURE__*/
    React.createElement("div", { className: "sensor" }), /*#__PURE__*/
    React.createElement(Display, { display: state.display }), /*#__PURE__*/
    React.createElement(Buttons, { onClickHandler: onClickHandler }))));



};

const Display = ({ display }) => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "display", className: "display" },
    display));


};

const Buttons = ({ onClickHandler }) => {
  const btns = [
  { name: "clear", value: "AC", key: " " },
  { name: "backspace", value: "⬅", key: "Backspace" },
  { name: "divide", value: "÷", key: "/" },
  { name: "seven", value: 7, key: "7" },
  { name: "eight", value: 8, key: "8" },
  { name: "nine", value: 9, key: "9" },
  { name: "multiply", value: "×", key: "*" },
  { name: "four", value: 4, key: "4" },
  { name: "five", value: 5, key: "5" },
  { name: "six", value: 6, key: "6" },
  { name: "subtract", value: "-", key: "-" },
  { name: "one", value: 1, key: "1" },
  { name: "two", value: 2, key: "2" },
  { name: "three", value: 3, key: "3" },
  { name: "add", value: "+", key: "+" },
  { name: "zero", value: 0, key: "0" },
  { name: "decimal", value: ".", key: "." },
  { name: "equals", value: "=", key: "Enter" }];


  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  function handleKeyDown(e) {
    for (let i = 0; i < btns.length; i++) {
      btns[i].key === e.key ? onClickHandler(btns[i].value) : null;
    }
  }

  return /*#__PURE__*/(
    React.createElement("div", { className: "buttons" },
    btns.map((btn) => /*#__PURE__*/
    React.createElement("button", {
      id: btn.name,
      className: btn.name,
      tabindex: "-1",
      onClick: () => onClickHandler(btn.value) },

    btn.value))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById("app"));