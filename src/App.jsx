import { BrowserRouter as Router } from 'react-router-dom';
import MobileLayout from './components/layouts/MobileLayout';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <MobileLayout>
        <AppRoutes />
      </MobileLayout>
    </Router>
  );
}

export default App; 