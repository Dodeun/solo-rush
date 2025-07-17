import { createContext, useContext, useState } from "react";
import type { CompleteTierList } from "../api/types/tierList";

export interface AppContextType {
    tierList: CompleteTierList | null;
    setTierList: React.Dispatch<React.SetStateAction<CompleteTierList | null>>;
}

interface AppProviderProps {
    children: React.ReactNode;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: AppProviderProps) {
    const [tierList, setTierList] = useState<CompleteTierList | null>(null);

    return (
        <AppContext.Provider
            value={{ tierList: tierList, setTierList: setTierList }}
        >
            {children}
        </AppContext.Provider>
    );
}

// Call this custom hook to safely consume the context in your components
export function useAppContext() {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("Context is null");
    }
    return context;
}
