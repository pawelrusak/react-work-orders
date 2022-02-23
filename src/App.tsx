import * as React from "react";

import "./App.css";
import { fakeFetch } from "./utils";
import Table from "./components/Table/Table";

import type { MockWorkOrdersResponse } from "./types";

type FetchStatus = "idle" | "loading" | "succeeded" | "failed";

type State = {
  data: MockWorkOrdersResponse | null;
  status: FetchStatus;
  error: string | null;
};

type Action =
  | { type: "start" }
  | { type: "success"; payload: MockWorkOrdersResponse }
  | { type: "error"; error: string | null };

const fetchWorkOrderReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "loading" as const,
      } as State;
    case "success":
      return {
        ...state,
        data: action.payload,
        status: "succeeded" as const,
      } as State;
    case "error":
      return {
        ...state,
        error: action.error,
        status: "failed",
      } as State;
    default:
      throw new Error("Wrong action");
  }
};

function App() {
  const [state, dispatch] = React.useReducer(fetchWorkOrderReducer, {
    data: null,
    status: "idle" as const,
    error: null,
  } as State);

  React.useEffect(() => {
    const fetchFakeApi = async () => {
      try {
        const response = await fakeFetch();

        dispatch({ type: "success", payload: response });
      } catch (error) {
        // @todo try imitate this later, not required
        dispatch({ type: "error", error: "fake error" });
      }
    };

    dispatch({ type: "start" });

    fetchFakeApi();
  }, []);

  let renderElement: React.ReactNode;

  if (state.status === "idle" || state.status === "loading") {
    renderElement = (
      <section aria-labelledby="loading-title">
        <h2 id="loading-title">Loading</h2>
      </section>
    );
  }

  if (state.status === "succeeded") {
    renderElement = (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th colSpan={2}>Description</th>
            <th>Received date</th>
            <th>Assigned to</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>

        <tbody>
          {state.data?.response.data.map(
            ({
              work_order_id,
              description,
              received_date,
              assigned_to,
              status,
              priority,
            }) => (
              <tr>
                <td>{work_order_id}</td>
                <td colSpan={2}>{description}</td>
                <td>
                  <time dateTime={new Date(received_date).toISOString()}>
                    {received_date}
                  </time>
                </td>
                <td>
                  {assigned_to.length ? (
                    <ul>
                      {assigned_to.map(({ person_name, status }) => (
                        <li>
                          {person_name}{" "}
                          <span
                            title={`Status ${status}`}
                          >{`(${status[0]})`}</span>{" "}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <i>none</i>
                  )}
                </td>
                <td>{status}</td>
                <td>{priority}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    );
  }

  return (
    <main className="App">
      <h1>Work orders</h1>
      {renderElement}
    </main>
  );
}

export default App;
