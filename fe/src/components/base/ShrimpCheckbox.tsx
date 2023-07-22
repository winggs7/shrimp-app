import React from "react";

export interface Props {
  items: any;
  checkedItems?: any;
  onChange?: any;
}

export default function ShrimpCheckbox({
  items,
  checkedItems,
  onChange,
}: Props) {
  return (
    <div className="shrimpCheckbox">
      {items &&
        items.map((item: any, id: any) => {
          return (
            <div key={item?.id} className={"checkbox-item"}>
              <input
                type="checkbox"
                value={item?.id}
                onChange={(e) => onChange(e)}
                checked={checkedItems?.includes(item.id) ? true : false}
              />
              {item?.name}
            </div>
          );
        })}
    </div>
  );
}
