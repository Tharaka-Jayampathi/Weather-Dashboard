import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchCity, setSearchCity, handleSearch }) => {
  return (
    <form 
      onSubmit={handleSearch} 
      className="w-full max-w-md relative mb-10 shadow-xl rounded-full overflow-hidden bg-white/95 backdrop-blur-sm border border-white/50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all hover:shadow-2xl"
    >
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-indigo-400">
        <FiSearch className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder="Enter city name..."
        className="w-full pl-12 pr-28 py-4 text-gray-700 bg-transparent focus:outline-none rounded-full sm:text-lg"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-full font-medium transition-all shadow-md active:scale-95 flex items-center justify-center focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
