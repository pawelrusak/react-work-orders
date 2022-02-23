import * as React from "react";

import type { WorkOrder } from "../types";

export const useFilterWorkerOrders = (
  search: string,
  workOrders: WorkOrder[]
) => {
  const filteredWorkOrders = React.useMemo(() => {
    if (search && workOrders) {
      return workOrders.filter(({ description }) => {
        return description
          .toLocaleLowerCase()
          .trim()
          .includes(search.toLocaleLowerCase().trim());
      });
    }
    return workOrders;
  }, [workOrders, search]);

  return filteredWorkOrders;
};
