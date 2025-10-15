import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a task description'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    dueDate: {
      type: Date,
      required: [true, 'Please provide a due date']
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    isPrivate: {
      type: Boolean,
      default: false,
      comment: 'If true, only the creator can see this task (personal task)'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
taskSchema.index({ createdBy: 1, team: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
