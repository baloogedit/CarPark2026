import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'carpark_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    // theme from local storage or default to dark
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return (savedTheme as Theme) || 'dark';
    });

    // at every theme change - update + save
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// custom hook
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}