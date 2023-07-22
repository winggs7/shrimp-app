import React from "react";

export interface Props {
  items?: any;
  value?: string;
  onChange: Function;
  title?: string;
}

export default function ShrimpSelect({ value, onChange, title, items }: Props) {
  return (
    <div className="shrimpSelect">
      {title && <>Pick your favorite flavor:</>}
      <select value={value} onChange={() => onChange}>
        {items?.map((item: any) => {
          return (
            <>
              <option value={item?.key}>{item?.name}</option>
              <option value={item?.key}>{item?.name}</option>
            </>
          );
        })}
      </select>
    </div>
  );
}
