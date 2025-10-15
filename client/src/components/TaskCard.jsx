const priorityColors = {
  low: 'bg-green-100 border-green-400 text-green-800',
  medium: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  high: 'bg-red-100 border-red-400 text-red-800'
};

const priorityBadgeColors = {
  low: 'bg-green-200 text-green-800',
  medium: 'bg-yellow-200 text-yellow-800',
  high: 'bg-red-200 text-red-800'
};

const TaskCard = ({ task, onEdit, onDelete, showActions = true }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isPastDue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`card border-l-4 ${priorityColors[task.priority]} hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
            {task.isPrivate && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full" title="Private task - only you can see this">
                🔒 Private
              </span>
            )}
          </div>
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${priorityBadgeColors[task.priority]}`}>
            {task.priority.toUpperCase()}
          </span>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task._id)}
              className="text-primary-600 hover:text-primary-800"
              title="Edit"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 mb-3">{task.description}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          <span className="font-medium">Due:</span>{' '}
          <span className={isPastDue ? 'text-red-600 font-semibold' : ''}>
            {formatDate(task.dueDate)}
          </span>
        </div>
        <div>
          <span className="font-medium">Status:</span>{' '}
          <span className="capitalize">{task.status}</span>
        </div>
      </div>
      
      {task.createdBy && (
        <div className="mt-2 text-xs text-gray-400">
          Created by: {task.createdBy.name}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
