import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../utilities/types";
import clsx from "clsx";

interface TaskCardProps {
  item: Task;
  index: number;
}

// const statusBgColor: Record<Status, string> = {
//   new: "bg-yellow-200 text-yellow-800",
//   ongoing: "bg-blue-200 text-blue-800",
//   done: "bg-green-200 text-green-800",
// };

const TaskCard: React.FC<TaskCardProps> = ({ item, index }) => {
  return (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => {
      const isOverdue = item.deadline && new Date(item.deadline) < new Date();

      return (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "hover:shadow-md transition-shadow relative",
            item.status === "new" && "bg-blue-200 rounded-lg shadow-sm p-4 mb-3 border border-gray-200",
            item.status === "ongoing" && "bg-amber-200 rounded-lg shadow-sm p-4 mb-3 border border-gray-200",
            item.status === "done" && "bg-emerald-100 rounded-lg shadow-sm p-4 mb-3 border border-gray-200"
          )}
        >
          {/* Status Label */}
          <span
            className={clsx(
              "absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded",
              item.status === "new" && "bg-blue-600 text-white",
              item.status === "ongoing" && "bg-amber-600 text-white",
              item.status === "done" && "bg-emerald-600 text-white"
            )}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>

          <h3 className="font-semibold text-md text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
            {item.description}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            📅{" "}
            <span className="font-medium text-gray-700">
              {new Date(item.deadline).toLocaleDateString()}
            </span>

            {/* ⚠️ Warning for overdue */}
            {isOverdue && (
              <span className="text-red-600 ml-2 cursor-help" title="This task is overdue!">
                ⚠️
              </span>
            )}
          </div>
        </div>
      );
    }}
  </Draggable>

);

};

export default TaskCard;
