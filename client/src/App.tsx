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
                <div className={styles.container}>
                    <div className={styles.background}></div>
                </div>
            </AppProvider>
        </>
    );
}

export default App;
