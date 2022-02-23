import styles from "./AssignedInfo.module.scss";

import type { Assigned } from "./../../types";

// Try to simulate React Native styling
const assignedToListItem = {
  display: "flex",
  justifyContent: "space-between",
};

type AssignedInfoProps = {
  readonly assignedTo: Assigned[];
};

const AssignedInfo = ({ assignedTo }: AssignedInfoProps) => {
  return (
    <>
      {assignedTo.length ? (
        <ul className={styles.AssignedInfo}>
          {assignedTo.map(({ person_name, status }) => (
            <li style={assignedToListItem}>
              {person_name}{" "}
              <span title={`Status ${status}`}>{`(${status[0]})`}</span>{" "}
            </li>
          ))}
        </ul>
      ) : (
        <i>none</i>
      )}
    </>
  );
};

export default AssignedInfo;
