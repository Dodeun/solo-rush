import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";

function App() {
    return (
        <>
            {/* si on a un context, il faudra mettre le provider là */}
            <TopBar /> {/* les noms sont provisoires*/}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
