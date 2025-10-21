const MAX_PAGE = 2;
const USERS_PER_PAGE = 2;

$(document).ready(async () => {
  let data = [];

  for (let i = 1; i <= MAX_PAGE; i++) {
    const users = await getUsers(i);
    if (users && users.data) {
      data = data.concat(users.data);
    }
  }

  addPageLink(data.length);

  const userTable = $(".user-table");

  listUser(data, userTable, 1);

  $(".pagination").on("click", ".page-link", function (e) {
    e.preventDefault();
    const $this = $(this);
    const $parentItem = $this.parent();
    if ($parentItem.hasClass("active") || $parentItem.hasClass("disabled")) {
      return;
    }

    const $activeItem = $(".pagination .page-item.active");
    const currentPage = parseInt($activeItem.text(), 10);
    const totalPages = $(".pagination .page-item").length - 2;

    let newPage;
    const pageText = $this.text().trim();

    if (pageText === "«") {
      newPage = currentPage - 1;
    } else if (pageText === "»") {
      newPage = currentPage + 1;
    } else {
      newPage = parseInt(pageText, 10);
    }

    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    $activeItem.removeClass("active");
    $(".pagination .page-item").eq(newPage).addClass("active");

    $(".pagination .page-item:first-child").toggleClass(
      "disabled",
      newPage === 1
    );
    $(".pagination .page-item:last-child").toggleClass(
      "disabled",
      newPage === totalPages
    );

    listUser(data, userTable, newPage);
  });
});

// --- NO CHANGES NEEDED BELOW THIS LINE ---

async function getUsers(pageNum) {
  try {
    const res = await fetch(`https://reqres.in/api/users?page=${pageNum}`, {
      method: "GET",
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return null;
  }
}

function listUser(data, userTable, currentPage) {
  userTable.empty();

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;

  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    userTable.append(`
        <tr>
            <th scope="row">${data[i].id}</th>
            <td>${data[i].first_name}</td>
            <td>${data[i].last_name}</td>
            <td>${data[i].email}</td>
            <td>
            <img
                src="${data[i].avatar}"
                alt="${data[i].first_name} ${data[i].last_name}"
                width="40"
                height="40"
                class="rounded-circle"
            />
            </td>
        </tr>`);
  }
}

function addPageLink(userNum) {
  const pagination = $(".pagination");
  const pageNum = Math.ceil(userNum / USERS_PER_PAGE);

  pagination.append(`
    <li class="page-item disabled"> 
        <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        </a>
    </li>`);

  for (let i = 1; i <= pageNum; i++) {
    pagination.append(`
        <li class="page-item ${i === 1 ? "active" : ""}">
            <a class="page-link" href="#">${i}</a>
        </li>`);
  }

  pagination.append(`
    <li class="page-item ${pageNum <= 1 ? "disabled" : ""}">
        <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        </a>
    </li>`);
}
