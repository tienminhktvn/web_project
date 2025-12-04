const API_URL = "https://dflrkadcuxdhvfoawxra.supabase.co/rest/v1";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbHJrYWRjdXhkaHZmb2F3eHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1OTQ5NTksImV4cCI6MjA4MDE3MDk1OX0.qrgkggTn2lllbTrygzOjXukyMMpdZ7nYbMWJaToZhn4";

/// Products:
/// Lấy tất cả Products
export async function GetAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products?select=*`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

/// Lấy Products Range
// api/api.js

export async function GetProducts(start, end) {
  try {
    const response = await fetch(`${API_URL}/products?select=*`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Range: `${start}-${end}`,
        Prefer: "count=exact",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentRange = response.headers.get("Content-Range");
    const count = contentRange ? parseInt(contentRange.split("/")[1]) : 0;

    const data = await response.json();

    return { data, count };
  } catch (error) {
    console.log(error.message);
    return { data: [], count: 0 };
  }
}

/// Users:
/// Lấy tất cả Users
export async function GetAllUsers() {
  try {
    const response = await fetch(`${API_URL}/users?select=*`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

/// Lấy User với username
export async function GetUserByUsername(username) {
  try {
    const response = await fetch(
      `${API_URL}/users?select=*&username=eq.${username}`,
      {
        method: "GET",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

/// Thêm một User mới
export async function CreateUser(userData) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        username: userData.username,
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
