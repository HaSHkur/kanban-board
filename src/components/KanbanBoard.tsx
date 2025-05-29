import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import type { Columns } from "../utilities/types";

const initialData: Columns = {
  todo: {
    name: "To Do",
    items: [
      { id: "1", content: "Buy groceries" },
      { id: "2", content: "Write blog post" },
    ],
  },
  inProgress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, movedItem);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, items: sourceItems },
        [destination.droppableId]: { ...destCol, items: destItems },
      });
    }
  };

  return (
  <div className="w-full h-full">
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-6 w-full h-full">
        {Object.entries(columns).map(([id, column]) => (
          <Column key={id} columnId={id} column={column} />
        ))}
      </div>
    </DragDropContext>
  </div>
);

};

export default KanbanBoard;
