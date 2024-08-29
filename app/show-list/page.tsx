'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components to Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockData = [
  { id: 1, title: 'Quote 1', votes: 12 },
  { id: 2, title: 'Quote 2', votes: 19 },
  { id: 3, title: 'Quote 3', votes: 3 },
];

const ShowListPage: React.FC = () => {
  const [items, setItems] = useState(mockData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreItems = async () => {
    setLoading(true);
    const newItems = mockData.map(item => ({ ...item, id: item.id + page * 3 }));
    setItems(prevItems => [...prevItems, ...newItems]);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const chartData = {
    labels: sortedItems.map(item => item.title),
    datasets: [
      {
        label: 'Vote Results',
        data: sortedItems.map(item => item.votes),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Show List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort: {sortOrder}
      </button>
      <Bar data={chartData} className="my-6"/>
      <div className="grid grid-cols-1 gap-4">
        {sortedItems.map(item => (
          <div key={item.id} className="p-4 border border-gray-300 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-700">Votes: {item.votes}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <button onClick={loadMoreItems} disabled={loading} className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Load More
      </button>
    </div>
  );
};

export default ShowListPage;
