/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary-200" : "#3b82f6", // blue-500
        "primary-100" : "#1d4ed8", // blue-700
        "secondary-200" : "#475569", // slate-600 
        "secondary-100" : "#1e293b", // slate-800
        "accent-200" : "#6366f1", // indigo-500
        "accent-100" : "#4338ca", // indigo-700
        "success-200" : "#10b981", // emerald-500
        "success-100" : "#059669", // emerald-600
        "warning-200" : "#f59e0b", // amber-500
        "warning-100" : "#d97706", // amber-600
        "error-200" : "#ef4444", // red-500
        "error-100" : "#dc2626" // red-600
      }
    },
  },
  plugins: [],
}

