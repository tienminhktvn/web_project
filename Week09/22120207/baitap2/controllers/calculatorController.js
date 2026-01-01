import Calculator from "../models/calculatorModel.js";

export const getIndex = (_, res) => {
  res.render("index", { title: "Bé tập tính (AJAX)" });
};

export const postCalculate = (req, res) => {
  const { x, y, operator } = req.body;

  const calc = new Calculator(x, y, operator);
  const result = calc.calculate();

  res.json({ result: result });
};
