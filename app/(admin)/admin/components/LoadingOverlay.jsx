"use client";

export default function LoadingOverlay({ show = false }) {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner" />
    </div>
  );
}
