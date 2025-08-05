// src/components/ui/input.jsx
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`border rounded-xl px-3 py-2 w-full outline-none focus:border-blue-400 transition ${className}`}
      {...props}
    />
  );
}
