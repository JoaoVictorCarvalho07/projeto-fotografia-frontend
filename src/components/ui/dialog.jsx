// src/components/ui/dialog.jsx
import { useEffect } from "react";

export function Dialog({ open, onOpenChange, children }) {
  // Fecha ao pressionar ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) onOpenChange?.(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {children}
    </div>
  );
}

export function DialogContent({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 animate-fadeIn ${className}`}
    >
      {children}
    </div>
  );
}
