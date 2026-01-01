const resultContainer = document.getElementById("resultContainer");
const resultValue = document.getElementById("resultValue");
const calcForm = document.getElementById("calcForm");

calcForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const x = document.getElementById("x").value;
  const y = document.getElementById("y").value;
  const operator = document.getElementById("operator").value;

  try {
    const response = await fetch("/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y, operator }),
    });

    const data = await response.json();

    resultValue.innerText = data.result;
    resultContainer.style.display = "flex";
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
});
