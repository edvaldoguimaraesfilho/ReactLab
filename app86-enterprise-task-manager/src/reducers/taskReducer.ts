import type { TaskItem, TaskStatus } from "../models/TaskItem";

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: TaskItem;
    }
  | {
      type: "CHANGE_STATUS";
      payload: {
        id: number;
        status: TaskStatus;
      };
    }
  | {
      type: "DELETE_TASK";
      payload: {
        id: number;
      };
    };

export function taskReducer(
  state: TaskItem[],
  action: TaskAction
): TaskItem[] {
  switch (action.type) {
    case "ADD_TASK":
      return [action.payload, ...state];

    case "CHANGE_STATUS":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              status: action.payload.status,
            }
          : task
      );

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload.id);

    default:
      return state;
  }
}