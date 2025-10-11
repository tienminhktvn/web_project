function calculate() {
  const firstNumber = document.getElementById("firstNumber").value;
  const secondNumber = document.getElementById("secondNumber").value;
  const resultBox = document.getElementById("result");
  const notification = document.getElementById("notification");
  const operation = document.querySelector('input[name="operation"]:checked');

  resultBox.value = "";
  notification.textContent = "";

  if (isNaN(firstNumber) || firstNumber === "") {
    notification.textContent = "Giá trị nhập ở ô Số thứ nhất không phải là số.";
    return;
  }

  if (isNaN(secondNumber) || secondNumber === "") {
    notification.textContent = "Giá trị nhập ở ô Số thứ hai không phải là số.";
    return;
  }

  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  if (!operation) {
    notification.textContent = "Vui lòng chọn phép tính.";
    return;
  }

  let result;
  switch (operation.value) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        notification.textContent = "Không thể chia cho 0.";
        return;
      }
      result = num1 / num2;
      break;
    default:
      notification.textContent = "Phép tính không hợp lệ.";
      return;
  }
  resultBox.value = result;
}

document.getElementById("firstNumber").addEventListener("blur", function () {
  if (isNaN(this.value) || this.value === "") {
    document.getElementById("notification").textContent =
      "Giá trị nhập ở ô Số thứ nhất không phải là số.";
  } else {
    document.getElementById("notification").textContent = "";
  }
});

document.getElementById("secondNumber").addEventListener("blur", function () {
  if (isNaN(this.value) || this.value === "") {
    document.getElementById("notification").textContent =
      "Giá trị nhập ở ô Số thứ hai không phải là số.";
  } else {
    document.getElementById("notification").textContent = "";
  }
});
