import React from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center ">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Not Found"
        className="w-100 h-auto mb-8"
      />
      
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">404 - No Result Found</h1>
      
      <p className="text-lg text-gray-600 mb-6 max-w-md">
        Oops! We couldn't find any result that match your search. Try adjusting your filters or search area.
      </p>

      <button
        onClick={() => navigate('/')}
        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg hover:cursor-pointer"
      >
        <Home className="h-5 w-5" />
        <span>Go to Home</span>
      </button>
    </div>
  );
};

export default NotFound;
