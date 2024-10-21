import React, { useState, useCallback } from 'react';
import { FileSearch, Trash2, RefreshCw } from 'lucide-react';
import FileList from './components/FileList';
import DuplicateList from './components/DuplicateList';
import { findDuplicates } from './utils/fileFinder';

function App() {
  const [path, setPath] = useState('');
  const [duplicates, setDuplicates] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [useHash, setUseHash] = useState(true);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await findDuplicates(path, useHash);
      setDuplicates(result);
    } catch (error) {
      console.error('Error finding duplicates:', error);
      alert('An error occurred while finding duplicates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [path, useHash]);

  const handleClear = useCallback(() => {
    setPath('');
    setDuplicates({});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">File Duplicate Finder</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="Enter directory path"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !path}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? <RefreshCw className="animate-spin mr-2" size={20} /> : <FileSearch size={20} className="mr-2" />}
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useHash"
              checked={useHash}
              onChange={(e) => setUseHash(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="useHash" className="text-gray-700">Use file hash (slower but more accurate)</label>
          </div>
          <button
            onClick={handleClear}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 flex items-center"
          >
            <Trash2 size={20} className="mr-2" />
            Clear Results
          </button>
        </div>
        {Object.keys(duplicates).length > 0 ? (
          <DuplicateList duplicates={duplicates} />
        ) : (
          <FileList path={path} />
        )}
      </div>
    </div>
  );
}

export default App;