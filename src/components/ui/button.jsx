// src/components/ui/button.jsx
export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const color =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "secondary"
      ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
      : variant === "destructive"
      ? "bg-red-500 text-white hover:bg-red-600"
      : variant === "outline"
      ? "border border-gray-400 text-gray-700 hover:bg-gray-100"
      : "bg-gray-100 text-gray-700";
  const padding =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2";
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl shadow-sm font-medium transition ${color} ${padding} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
