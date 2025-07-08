import React from "react";

export default function Filter({
  selectedCategory,
  setSelectedCategory,
  uniqueCategories,
  selectedStore,
  setSelectedStore,
  uniqueStores,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
      {/* Category */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        >
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {/* Store */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Store</label>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        >
          {uniqueStores.map((store, idx) => (
            <option key={idx} value={store}>{store}</option>
          ))}
        </select>
      </div>
      {/* Sort */}
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        >
          <option value="">-- Select --</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name">Name: A → Z</option>
          <option value="quantity">Quantity: High → Low</option>
        </select>
      </div>
    </div>
  );
}