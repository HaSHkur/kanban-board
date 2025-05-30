import React, { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { title: string; description: string; deadline: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = () => {
    if (!title || !description || !deadline) return;
    onAddTask({ title, description, deadline });
    setTitle("");
    setDescription("");
    setDeadline("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border mb-2 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border mb-2 p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="w-full border mb-4 p-2 rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
