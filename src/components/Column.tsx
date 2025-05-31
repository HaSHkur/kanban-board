import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { ColumnType } from "../utilities/types";

interface ColumnProps {
  columnId: string;
  column: ColumnType;
  onMoveTask: (taskId: string, from: string, to: string) => void;
}

const Column: React.FC<ColumnProps> = ({ columnId, column, onMoveTask }) => {
  return (
    <div className="bg-gray-200 rounded-2xl p-3 w-full h-[80vh] flex flex-col">
      <h2 className="font-bold text-lg mb-3 pl-3">{column.name}</h2>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-grow p-2 rounded-2xl overflow-y-auto transition-colors ${
              snapshot.isDraggingOver ? "bg-blue-100" : "bg-white"
            }`}
          >
            {column.items.map((item, index) => (
              <TaskCard
                key={item.id}
                item={item}
                index={index}
                columnId={columnId}
                onMoveTask={onMoveTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
