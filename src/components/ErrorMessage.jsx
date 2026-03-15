import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ error }) => {
  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-red-200 p-6 mb-8 rounded-2xl shadow-2xl transform transition-all animate-in fade-in slide-in-from-top-4 flex items-start gap-4 mx-auto">
      <div className="flex-shrink-0 bg-red-100 p-3 rounded-full text-red-600 shadow-inner">
        <FiAlertCircle className="h-7 w-7" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-red-800 mb-1">Search Error</h3>
        <p className="text-sm text-red-600 font-medium leading-relaxed">
          {error}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
