import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../utilities/types";


interface TaskCardProps {
  item: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="bg-white p-2 rounded shadow mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
