import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import type { Task } from "../utilities/types";
import clsx from "clsx";

interface TaskCardProps {
  item: Task;
  index: number;
  columnId: string;
  onMoveTask: (taskId: string, from: string, to: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ item, index, columnId, onMoveTask }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPos({ x: e.pageX, y: e.pageY });
    setMenuOpen(true);
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const columnOptions = {
    todo: ["inprogress", "done"],
    inprogress: ["todo", "done"],
    done: ["todo", "inprogress"],
  };

  const isOverdue = item.deadline && new Date(item.deadline) < new Date();

  return (
    <>
      <Draggable draggableId={item.id} index={index}>
        {(provided) => (
          <div
            onContextMenu={handleContextMenu}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={clsx(
              "hover:shadow-md transition-shadow relative",
              item.status === "new" && "bg-blue-200",
              item.status === "ongoing" && "bg-amber-200",
              item.status === "done" && "bg-emerald-100",
              "rounded-lg shadow-sm p-4 mb-3 border border-gray-200"
            )}
          >
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
            <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{item.description}</p>

            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
              📅 <span className="font-medium text-gray-700">{new Date(item.deadline).toLocaleString()}</span>
              {isOverdue && (
                <span className="text-red-600 ml-2 cursor-help" title="This task is overdue!">⚠️</span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 bg-white border rounded shadow-lg text-sm"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          {columnOptions[columnId as keyof typeof columnOptions].map((targetCol) => (
            <div
              key={targetCol}
              onClick={() => {
                onMoveTask(item.id, columnId, targetCol);
                setMenuOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Move to {targetCol === "todo" ? "New" : targetCol === "inprogress" ? "Ongoing" : "Done"}
            </div>
          ))}
        </div>
      )}
    </>
  );
};



export default TaskCard;
