import React, { useEffect } from "react";

export interface Props {
  title?: string;
  type?: "outlined" | "submit" | "cancel" | "error";
  onClick?: any;
}

export default function ShrimpButton({ title, onClick, type }: Props) {
  return (
    <div className={`shrimp-button ${type}`} onClick={onClick}>
      {title}
    </div>
  );
}
