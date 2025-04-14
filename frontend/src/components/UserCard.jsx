import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setMessage(null);
    
    try {
      const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'User deleted successfully' });
        // Notify parent component
        setTimeout(() => {
          onDelete(user.id);
        }, 1000);
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {message && (
        <div className={`text-sm p-2 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center justify-center mb-4">
          <img 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`} 
            className="w-24 h-24 rounded-full"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-center">
          {user.first_name} {user.last_name}
        </h3>
        
        {user.email && (
          <p className="text-gray-600 text-center mt-1">{user.email}</p>
        )}
        
        <div className="flex justify-center mt-4 space-x-2">
          <Link 
            to={`/users/${user.id}/edit`} 
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          >
            Edit
          </Link>
          
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;