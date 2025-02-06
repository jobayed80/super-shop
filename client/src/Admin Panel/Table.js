import React from "react";


const Table = () => {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">User List</h2>
  <div className="overflow-x-auto">
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-4 border-b font-semibold text-gray-600">ID</th>
          <th className="p-4 border-b font-semibold text-gray-600">Name</th>
          <th className="p-4 border-b font-semibold text-gray-600">Email</th>
          <th className="p-4 border-b font-semibold text-gray-600">Role</th>
          <th className="p-4 border-b font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-50">
          <td className="p-4 border-b">1</td>
          <td className="p-4 border-b">John Doe</td>
          <td className="p-4 border-b">johndoe@example.com</td>
          <td className="p-4 border-b">Admin</td>
          <td className="p-4 border-b text-blue-500 hover:underline cursor-pointer">
            Edit
          </td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="p-4 border-b">2</td>
          <td className="p-4 border-b">Jane Smith</td>
          <td className="p-4 border-b">janesmith@example.com</td>
          <td className="p-4 border-b">User</td>
          <td className="p-4 border-b text-blue-500 hover:underline cursor-pointer">
            Edit
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default Table;
