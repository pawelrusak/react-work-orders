import * as React from "react";

import "./App.css";
import WorkOrdersTable from "./components/WorkOrdersTable/WorkOrdersTable";
import Search from "./components/Search/Search";
import { useFilterWorkerOrders } from "./hooks/useFilterWorkerOrders";
import { useFetchWorkOrders } from "./hooks/useFetchWorkOrders";

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
      <WorkOrdersTable workOrders={filteredWorkOrders}></WorkOrdersTable>
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
