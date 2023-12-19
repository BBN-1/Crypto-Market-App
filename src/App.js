import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CoinDetails from "./components/CoinDetails/CoinDetails";
import { CoinProvider } from "./context/coinContext";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header />
            <CoinProvider>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/currencies/:coinName"
                        element={<CoinDetails />}
                    />
                </Routes>
            </CoinProvider>
            <Footer />
        </div>
    );
}

export default App;
