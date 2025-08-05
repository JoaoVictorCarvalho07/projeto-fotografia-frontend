import { useState, Children } from "react";

export function Tabs({ children, initial = 0 }) {
  const [active, setActive] = useState(initial);
  const tabs = Children.toArray(children);

  return (
    <div>
      <div className="flex flex-wrap sm:flex-nowrap gap-2 mb-4 border-b border-purple-200 overflow-x-auto ">
        {tabs.map((tab, i) => (
          <button
            key={tab.props.label}
            className={
              " px-4 py-2 font-bold rounded-t active " +
              (i === active
                ? "bg-purple-700 text-white shadow"
                : "bg-white text-purple-700 hover:bg-purple-100")
            }
            onClick={() => setActive(i)}
            type="button"
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]}</div>
    </div>
  );
}

export function Tab({ children }) {
  return <div className="py-4">{children}</div>;
}
