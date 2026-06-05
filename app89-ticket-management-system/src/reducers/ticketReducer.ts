import type { Ticket } from "../models/Ticket";

export interface TicketState {
  tickets: Ticket[];
}

export type TicketAction =
  | { type: "ADD"; payload: Ticket }
  | { type: "DELETE"; payload: number }
  | {
      type: "UPDATE_STATUS";
      payload: {
        id: number;
        status: Ticket["status"];
      };
    };

export function ticketReducer(
  state: TicketState,
  action: TicketAction
): TicketState {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };

    case "DELETE":
      return {
        ...state,
        tickets: state.tickets.filter(
          ticket => ticket.id !== action.payload
        ),
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.id
            ? {
                ...ticket,
                status: action.payload.status,
              }
            : ticket
        ),
      };

    default:
      return state;
  }
}