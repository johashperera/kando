import { ShellComponent } from "./components/common";
import { TasksPage } from "./pages";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <ShellComponent>
        <DndProvider backend={HTML5Backend}>
          <TasksPage />
        </DndProvider>
      </ShellComponent>
    </>
  );
}

export default App;
