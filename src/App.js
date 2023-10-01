import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CoinProvider } from "./context/coinContext";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header />
            <CoinProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </CoinProvider>
            <Footer />
        </div>
    );
}

export default App;
