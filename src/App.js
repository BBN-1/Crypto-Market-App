

import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { CoinProvider } from './context/coinContext';

function App() {
  return (
    <div className="App">
      <Header/>
      <CoinProvider>
      <Home/>
      </CoinProvider>
      <Footer/>
    </div>
  );
}

export default App;
