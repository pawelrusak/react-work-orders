import React from "react";

type SearchProps = {
  readonly label?: string;
  readonly value: string;
  readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
>;

const Search = ({
  value,
  onChange,
  label = "Search",
  ...props
}: SearchProps) => {
  return (
    <div role="search">
      <form>
        <label>
          <span>{label}</span>
          <input type="search" value={value} onChange={onChange} {...props} />
        </label>
      </form>
    </div>
  );
};

export default Search;
