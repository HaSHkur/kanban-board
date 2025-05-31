import React, { useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import AddTaskModal from "./modals/AddTaskModal";
import { v4 as uuidv4 } from "uuid";
import type { Task, ColumnType } from "../utilities/types";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: ColumnType }>({
    todo: { name: "New", items: [] },
    inprogress: { name: "Ongoing", items: [] },
    done: { name: "Done", items: [] },
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleAddTask = (task: { title: string; description: string; deadline: string }) => {
    const newTask: Task = {
      id: uuidv4(),
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      status: "new"
    };

    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: [newTask, ...prev.todo.items],
      },
    }));
  };

  const handleMoveTask = (taskId: string, fromColumn: string, toColumn: string) => {
  setColumns((prevColumns) => {
    const sourceItems = [...prevColumns[fromColumn].items];
    const taskIndex = sourceItems.findIndex((item) => item.id === taskId);
    if (taskIndex === -1) return prevColumns;

    const [task] = sourceItems.splice(taskIndex, 1);

    task.status =
      toColumn === "todo"
        ? "new"
        : toColumn === "inprogress"
        ? "ongoing"
        : "done";

    const destItems = [task, ...prevColumns[toColumn].items];

    return {
      ...prevColumns,
      [fromColumn]: {
        ...prevColumns[fromColumn],
        items: sourceItems,
      },
      [toColumn]: {
        ...prevColumns[toColumn],
        items: destItems,
      },
    };
  });
};


  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    const [movedItem] = sourceItems.splice(source.index, 1);

    let updatedStatus: Task["status"] = movedItem.status;

    if (destination.droppableId === "todo") {
      updatedStatus = "new";
    } else if (destination.droppableId === "inprogress") {
      updatedStatus = "ongoing";
    } else if (destination.droppableId === "done") {
      updatedStatus = "done";
    }

    const updatedItem = { ...movedItem, status: updatedStatus };

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, updatedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, updatedItem);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 p-4">
        <h1 className="text-3xl font-bold ">Kanban Board</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      <AddTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTask={handleAddTask}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([id, column]) => (
            <div key={id}>
              <Column key={id} columnId={id} column={column} onMoveTask={handleMoveTask} />

            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
export default KanbanBoard;
