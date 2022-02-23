import Table from "../Table/Table";

import AssignedInfo from "../AssignedInfo/AssignedInfo";
import type { WorkOrder } from "../../types";

type WorkOrdersTableProps = {
  readonly workOrders: WorkOrder[];
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
                <AssignedInfo assignedTo={assigned_to} />
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
