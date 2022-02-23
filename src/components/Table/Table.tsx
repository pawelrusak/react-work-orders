import styles from "./Table.module.scss";

type TableProps = {
  readonly children: React.ReactNode;
};

const Table = ({ children }: TableProps) => {
  return <table className={styles.Table}>{children}</table>;
};

export default Table;
