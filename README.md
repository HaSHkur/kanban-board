# 🗂️ Kanban Board

A responsive Kanban board built with **React** and **Tailwind CSS** to manage tasks across three stages: **New**, **Ongoing**, and **Done**. Includes drag-and-drop support, context menus, deadline tracking with alerts, and tooltips for overdue tasks.

---

## 🚀 Features

- ✅ Three distinct columns: `New`, `Ongoing`, `Done`
- 📝 Create tasks with **title** and **description** (only in `New`)
- 🟦 Status labels with color-coded tags
- 📄 Context menu to swap tasks between columns
- 📦 Drag & drop feature for moving tasks between columns
- 📆 Set **deadline** for tasks
- ⏰ Visual warning with tooltip for **overdue** tasks
- 📱 Fully responsive layout

---

## 🧑‍💻 Technologies Used

- **React** (with functional components + hooks)
- **Tailwind CSS** for styling
- **@hello-pangea/dnd** for drag-and-drop
- **date-fns** for date formatting & comparison

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HaSHkur/kanban-board.git
   cd kanban-board
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

> ⚠️ Requires Node.js v14+ and npm v6+

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Board.tsx
│   ├── Column.tsx
│   └── TaskCard.tsx
├── App.tsx
├── index.tsx
├── styles/
│   └── index.css (Tailwind config)
```

## 🔧 Future Enhancements

- ✅ Backend integration with localStorage or database
- 🔔 Notification system for overdue tasks
- 📊 Task analytics/dashboard view
- 🗂️ Sub-tasks and priority labels

---

## 📄 License

MIT License © Hasibul Hasan Ankur
