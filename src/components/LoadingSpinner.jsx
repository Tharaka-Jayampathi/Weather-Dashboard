const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 mb-8 animate-in fade-in duration-500">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin shadow-lg"></div>
        {/* Inner pulsing core */}
        <div className="w-8 h-8 rounded-full bg-indigo-400/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse blur-sm"></div>
      </div>
      <p className="mt-6 font-medium text-indigo-700/80 tracking-widest uppercase text-sm animate-pulse">
        Gathering Data...
      </p>
    </div>
  );
};

export default LoadingSpinner;
