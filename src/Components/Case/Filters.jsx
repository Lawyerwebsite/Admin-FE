const Filters = ({ filters, onFilterChange, onExport, onAddNew }) => (
    <div className="flex gap-4 mb-6">
      <select
        name="status"
        value={filters.status}
        onChange={onFilterChange}
        className="p-2 border border-black rounded"
      >
        <option value="">Filter by Status</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Resolved">Resolved</option>
      </select>
      <input
        name="client"
        type="text"
        value={filters.client}
        onChange={onFilterChange}
        placeholder="Filter by Client"
        className="p-2 border border-black rounded"
      />
      <input
        name="startDate"
        type="date"
        value={filters.startDate}
        onChange={onFilterChange}
        className="p-2 border border-black rounded"
      />
      <button onClick={onExport} className="bg-gray-500 text-white px-4 py-2 rounded">
        Export Cases
      </button>
      <button onClick={onAddNew} className="bg-blue-500 text-white px-4 py-2 rounded">
        + Add Case
      </button>
    </div>
  );
  
  export default Filters;
  