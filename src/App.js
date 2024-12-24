// Import necessary libraries and components
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
            {/* Provide the CoinContext to the components */}
            <CoinProvider>
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Define the route for the CoinDetails component with dynamic parameters */}
                    <Route
                        path="/currencies/:coinName/:coinId"
                        element={<CoinDetails />}
                    />
                </Routes>
            </CoinProvider>
            <Footer />
        </div>
    );
}

export default App;
