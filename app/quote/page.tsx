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

interface Quote {
  id: number;
  text: string;
  votes: number;
}

const initialQuotes: Quote[] = [
  { id: 1, text: 'อย่ายอมแพ้ แม้จะไม่ได้กำลังใจจากใคร', votes: 5 },
  { id: 2, text: 'ทำวันนี้ให้ดีที่สุด แล้วพรุ่งนี้จะดีขึ้นเอง', votes: 10 },
  { id: 3, text: 'ชีวิตก็เหมือนคณิตศาสตร์ บางครั้งก็มีแต่โจทย์ที่ยาก', votes: 3 },
];

const QuotePage: React.FC = () => {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [newQuote, setNewQuote] = useState('');
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const addQuote = () => {
    if (newQuote.trim()) {
      const newQuoteObj = { id: quotes.length + 1, text: newQuote.trim(), votes: 0 };
      setQuotes([...quotes, newQuoteObj]);
      setNewQuote('');
    }
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  const voteForQuote = (id: number) => {
    const updatedQuotes = quotes.map(quote =>
      quote.id === id ? { ...quote, votes: quote.votes + 1 } : quote
    );
    setQuotes(updatedQuotes);
  };

  const loadMoreItems = () => {
    setLoading(true);
    const newItems = initialQuotes.map(item => ({
      ...item,
      id: quotes.length + 1,
    }));
    setQuotes([...quotes, ...newItems]);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });

  const chartData = {
    labels: sortedQuotes.map(quote => quote.text),
    datasets: [
      {
        label: 'Vote Results',
        data: sortedQuotes.map(quote => quote.votes),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Quotes</h1>

      {/* Random Quote */}
      <div className="mb-4">
        <button
          onClick={getRandomQuote}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Random Quote
        </button>
      </div>

      {randomQuote && (
        <div className="mb-4 p-4 border border-gray-300 rounded">
          <p>{randomQuote.text}</p>
          <p className="mt-2">Votes: {randomQuote.votes}</p>
          <button
            onClick={() => voteForQuote(randomQuote.id)}
            className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Vote
          </button>
        </div>
      )}

      {/* Add New Quote */}
      <h2 className="text-2xl mb-4">Add a New Quote</h2>
      <input
        type="text"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)}
        placeholder="Enter your quote"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={addQuote}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Add Quote
      </button>

      {/* Search and Sort */}
      <div className="my-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search quotes..."
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      {/* Visualize Chart */}
      <Bar data={chartData} className="my-6" />

      {/* Quotes List */}
      <h2 className="text-2xl mt-6">All Quotes</h2>
      <ul className="list-disc pl-6 mt-4">
        {sortedQuotes.map((quote) => (
          <li key={quote.id} className="mb-2">
            <p>{quote.text}</p>
            <p>Votes: {quote.votes}</p>
            <button
              onClick={() => voteForQuote(quote.id)}
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Vote
            </button>
          </li>
        ))}
      </ul>

      {/* Lazy Loading */}
      {loading && <p>Loading...</p>}
      <button
        onClick={loadMoreItems}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Load More
      </button>
    </div>
  );
};

export default QuotePage;
