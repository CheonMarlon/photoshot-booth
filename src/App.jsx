import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Home/Homepage';
import LayoutSelect from './components/Layouts/LayoutSelect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/layout-select" element={<LayoutSelect />} />
      </Routes>
    </Router>
  );
}

export default App;
