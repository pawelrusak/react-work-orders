// That might be too strict
// @todo
export type AssignedStatus =
  | "Assigned"
  | "In progress"
  | "Confirmed"
  | "Completed";
export type WorkOrderStatus = "New" | "Confirmed" | "Canceled" | "Completed";
export type WorkOrderPriority = "Low" | "High" | "Normal";

export type Assigned = {
  person_name: string;
  status: string;
};

export type WorkOrder = {
  work_order_id: number;
  description: string;
  received_date: string;
  assigned_to: Assigned[];
  status: string;
  priority: string;
};

export type MockWorkOrdersResponse = {
  exec_time: number;
  response: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    data: WorkOrder[];
  };
};
