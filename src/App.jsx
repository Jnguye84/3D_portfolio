import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects, Entertainment, Portfolio } from "./pages";

const App = () => {
  return (

      <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}  />
          <Route path='/tech' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/writing' element={<Entertainment />} />
          <Route path='/portfolio' element={<Portfolio />} />
        </Routes>
        <Footer />
      </Router>
  );
};

export default App;
