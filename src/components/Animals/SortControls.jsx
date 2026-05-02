const SortControls = ({ sortOrder, onSortChange }) => {
  return (
    <div className="flex justify-end mb-6">
      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="default">Default Order</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortControls;