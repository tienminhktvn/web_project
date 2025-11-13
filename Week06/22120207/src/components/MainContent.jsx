import Users from "./Users";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";

const MainContent = ({ searchKeyword }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
          method: "GET",
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers(null);
        setPage(1);
        setTotalPages(1);
      }
    };

    fetchData();
  }, [page]);

  const onPageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="border border-[#dedfe1] rounded-sm flex-1">
      <div className="border-b border-[#dedfe1] p-4 bg-gray-100">
        Main Content
      </div>

      <div className="flex flex-col gap-5 justify-between p-4">
        <Users users={users} searchKeyword={searchKeyword}></Users>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        ></Pagination>
      </div>
    </div>
  );
};

export default MainContent;
