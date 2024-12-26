const CaseTable = ({ cases, onEdit }) => (
    <table className="w-full border">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Client</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cases.map((c, i) => (
          <tr key={c.id}>
            <td>{i + 1}</td>
            <td>{c.title}</td>
            <td>{c.name}</td>
            <td>{c.status}</td>
            <td>
              <button onClick={() => onEdit(c)} className="text-blue-500">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  export default CaseTable;
  