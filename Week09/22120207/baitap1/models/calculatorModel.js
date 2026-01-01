export default class Calculator {
  constructor(x, y, operator) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.operator = operator;
  }

  calculate() {
    if (isNaN(this.x) || isNaN(this.y)) {
      return "Error: Invalid input";
    }

    let result;
    switch (this.operator) {
      case "+":
        result = this.x + this.y;
        break;
      case "-":
        result = this.x - this.y;
        break;
      case "*":
        result = this.x * this.y;
        break;
      case "/":
        if (this.y === 0) return "Error: Div by 0";
        result = this.x / this.y;
        break;
      default:
        result = "Invalid Operation";
    }
    return result;
  }
}
