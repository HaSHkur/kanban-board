import React from "react";
import KanbanBoard from "./components/KanbanBoard";

const App: React.FC = () => {
  return (
  <div className="min-h-screen w-screen bg-white p-4">
    {/* <h1 className="text-3xl font-bold mb-6">Kanban Board</h1> */}
      <KanbanBoard />
    </div>
);

};

export default App;

