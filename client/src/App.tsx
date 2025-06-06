import styles from "./App.module.css";
import { Outlet } from "react-router";
import { AppProvider } from "./context/AppContext";

function App() {
    return (
        <>
            <AppProvider>
                <main className={styles.page}>
                    <Outlet />
                </main>
            </AppProvider>
        </>
    );
}

export default App;
