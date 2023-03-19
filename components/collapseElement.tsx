import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";

interface ICollapseElement {
  title: string;
  children: React.ReactNode;
  className?: string;
  prevStatus?: boolean;
}
const CollapseElement = ({
  title,
  className,
  children,
  prevStatus = false,
}: ICollapseElement) => {
  const [collapse, setCollapse] = useState(prevStatus);

  const toggle = () => {
    setCollapse((state) => !state);
  };
  return (
    <div className={className}>
      <div className="flex justify-between cursor-pointer" onClick={toggle}>
        <div className="text-[#10243C] text-xl">{title}</div>
        <div>
          <button onClick={toggle}>
            <RxCaretDown
              className={`scale-[2] font-bold ${collapse ? "rotate-180" : ""} `}
            />
          </button>
        </div>
      </div>
      {collapse && children}
    </div>
  );
};

export default CollapseElement;
