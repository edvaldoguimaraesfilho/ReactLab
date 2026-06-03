import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

import { initialTasks } from "../data/initialTasks";
import { taskReducer, type TaskAction } from "../reducers/taskReducer";
import type { TaskItem } from "../models/TaskItem";

interface TaskContextValue {
  tasks: TaskItem[];
  dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}