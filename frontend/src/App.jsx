import { BrowserRouter, Routes, Route} from "react-router-dom";

import Navbar from './pages/layouts/Navbar';
import Home from './pages/Home';
import Links from './pages/Links';
import Download from './pages/Download';
import Contact from './pages/Contact';
import HowToUse from './pages/HowToUse';
import NoPage from './pages/NoPage';
import Test from './pages/Test';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="links" element={<Links />} />
          <Route path="how-to-use" element={<HowToUse />} />
          <Route path="contact" element={<Contact />} />
          <Route path="download/:fileId" element={<Download />} />
          <Route path="test" element={<Test />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
