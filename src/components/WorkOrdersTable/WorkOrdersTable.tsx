import Table from "../Table/Table";

import styles from "./WorkOrdersTable.module.scss";
import type { WorkOrder } from "../../types";

type WorkOrdersTableProps = {
  readonly workOrders: WorkOrder[];
};

// Try to simulate React Native styling
const assignedToListItem = {
  display: "flex",
  justifyContent: "space-between",
};

const WorkOrdersTable = ({ workOrders }: WorkOrdersTableProps) => {
  return (
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
        {workOrders.map(
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
                  <ul className={styles.WorkOrdersTable__assigned_to_list}>
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
};

export default WorkOrdersTable;
