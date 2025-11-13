const Users = ({ users, searchKeyword }) => {
  const keyword = searchKeyword.trim().toLowerCase();

  const filterUsers = keyword
    ? users.filter((user) => {
        const fullName = `${user.first_name || ""} ${
          user.last_name || ""
        }`.toLowerCase();
        const email = (user.email || "").toLowerCase();

        return fullName.includes(keyword) || email.includes(keyword);
      })
    : users;

  return (
    <div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#D4E1FC]">
            <th className="p-3">#</th>
            <th className="p-3">First</th>
            <th className="p-3">Last</th>
            <th className="p-3">Email</th>
            <th className="p-3">Avatar</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-slate-200 hover:bg-gray-100"
            >
              <td className="p-3 align-middle font-bold">{user.id}</td>
              <td className="p-3 align-middle">{user.first_name}</td>
              <td className="p-3 align-middle">{user.last_name}</td>
              <td className="p-3 align-middle">{user.email}</td>
              <td className="p-3 align-middle">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="h-12 w-12 rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
