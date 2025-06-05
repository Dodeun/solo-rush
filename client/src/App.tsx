import "./App.css";
import { Outlet } from "react-router";
import { AppProvider } from "./context/AppContext";

function App() {
    return (
        <AppProvider>
            <main>
                <Outlet />
            </main>
        </AppProvider>
    );
}

export default App;
