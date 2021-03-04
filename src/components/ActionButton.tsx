import React from "react";

function ActionButton({ color, label, icon, active, onClick }: any): JSX.Element {
  return (
    <button
      type="button"
      role="img"
      aria-label={label}
      data-active={active}
      style={{ "--background": color } as React.CSSProperties}
      onClick={() => onClick()}
    >
      <span>{icon}</span>
    </button>
  );
}

export default ActionButton;
