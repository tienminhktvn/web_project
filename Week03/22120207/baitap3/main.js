document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const button = form.querySelector("button");

  button.addEventListener("click", () => {
    // Clear previous errors
    form.querySelectorAll(".error-text").forEach((e) => e.remove());

    let valid = true;

    // Helper function
    const showError = (input, message) => {
      valid = false;
      input.classList.add("outline-red-500");
      input.classList.remove("outline-sky-500");

      const error = document.createElement("p");
      error.textContent = message;
      error.className = "error-text text-red-500 text-xs mt-1";
      input.insertAdjacentElement("afterend", error);
    };

    // Get inputs
    const fullname = form.fullname;
    const username = form.username;
    const email = form.email;
    const phone = form.phone;
    const birthday = form.birthday;

    // Reset outlines
    [fullname, username, email, phone, birthday].forEach((input) => {
      input.classList.remove("outline-red-500");
    });

    // Validation rules
    const fullnameError = validateFullName(fullname.value);
    if (fullnameError) showError(fullname, fullnameError);

    const usernameError = validateUsername(username.value);
    if (usernameError) showError(username, usernameError);

    if (!email.value.trim()) {
      showError(email, "Vui lòng nhập email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, "Email không hợp lệ");
    }

    if (!phone.value.trim()) {
      showError(phone, "Vui lòng nhập số điện thoại");
    } else if (!/^0[0-9]{9}$/.test(phone.value)) {
      showError(phone, "Số điện thoại không hợp lệ");
    }

    const today = new Date();
    const birthDate = new Date(birthday.value);
    let age = today.getFullYear() - birthDate.getFullYear() + 1;
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (!birthday.value.trim()) {
      showError(birthday, "Vui lòng chọn ngày sinh");
    } else if (age < 15 || age > 55) {
      showError(birthday, "Tuổi phải từ 15 đến 55");
    }

    if (valid) {
      window.location.href = "success.html";
      form.reset();
    }
  });
});

function validateFullName(name) {
  if (!name.trim()) return "Vui lòng nhập họ tên";

  const words = name.trim().split(/\s+/);
  for (const word of words) {
    const first = word.charAt(0);
    const rest = word.slice(1);

    if (first !== first.toUpperCase() || rest !== rest.toLowerCase()) {
      return "Mỗi từ trong họ tên phải viết hoa chữ cái đầu";
    }
  }
  return "";
}

function validateUsername(username) {
  if (!username.trim()) return "Vui lòng nhập username";

  if (username.includes(" ")) {
    return "Username không được chứa khoảng trắng";
  }

  const firstChar = username.charAt(0);
  if (firstChar >= "0" && firstChar <= "9") {
    return "Username không được bắt đầu bằng số";
  }

  for (const ch of username) {
    const isLetter = (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
    const isNumber = ch >= "0" && ch <= "9";
    const isUnderscore = ch === "_";

    if (!isLetter && !isNumber && !isUnderscore) {
      return "Username chỉ được chứa chữ, số và dấu gạch dưới (_)";
    }
  }
  return "";
}
