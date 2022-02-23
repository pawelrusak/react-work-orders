import * as React from "react";

import "./App.css";
import Table from "./components/Table/Table";
import Search from "./components/Search/Search";
import { useFilterWorkerOrders } from "./hooks/useFilterWorkerOrders";
import { useFetchWorkOrders } from "./hooks/useFetchWorkOrders";

// Try to simulate React Native styling
const assignedToListItem = {
  display: "flex",
  justifyContent: "space-between",
};

function App() {
  const [search, setSearch] = React.useState("");

  const state = useFetchWorkOrders();

  const filteredWorkOrders = useFilterWorkerOrders(
    search,
    state.data?.response.data!
  );

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
          {filteredWorkOrders.map(
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
                    <ul className="App__assigned-to-list">
                      {assigned_to.map(({ person_name, status }) => (
                        <li style={assignedToListItem}>
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

      <Search
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      ></Search>
      {renderElement}
    </main>
  );
}

export default App;
