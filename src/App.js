import Layout from './components/layout';
import './app.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './pages/notes';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/pinned" element={<Notes type="pinned" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
