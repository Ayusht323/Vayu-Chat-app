import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "dark",
    setTheme: (theme) => {
        // Update localStorage
        localStorage.setItem("theme", theme);
        // Apply theme to document immediately
        document.documentElement.setAttribute('data-theme', theme);
        // Update store state
        set({ theme });
    },
}));
