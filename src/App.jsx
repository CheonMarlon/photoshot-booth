import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Home/Homepage';
import LayoutSelect from './components/Layouts/LayoutSelect';
import Camera from './components/Camera/Camera';
import Customization from './components/Customization/Customization';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/layout-select" element={<LayoutSelect />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/customize" element={<Customization />} />
      </Routes>
    </Router>
  );
}

export default App;
