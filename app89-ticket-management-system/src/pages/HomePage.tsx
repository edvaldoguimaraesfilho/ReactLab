import { useReducer } from "react";

import { mockTickets } from "../data/mockTickets";

import {
  ticketReducer,
} from "../reducers/ticketReducer";

import { TicketDashboard }
  from "../components/TicketDashboard";

import { TicketForm }
  from "../components/TicketForm";

import { TicketGrid }
  from "../components/TicketGrid";

export function HomePage() {
  const [state, dispatch] =
    useReducer(ticketReducer, {
      tickets: mockTickets,
    });

  return (
    <>
      <TicketDashboard
        tickets={state.tickets}
      />

      <br />

      <TicketForm
        onAddTicket={ticket =>
          dispatch({
            type: "ADD",
            payload: ticket,
          })
        }
      />

      <br />

      <TicketGrid
        tickets={state.tickets}
        onDelete={id =>
          dispatch({
            type: "DELETE",
            payload: id,
          })
        }
      />
    </>
  );
}