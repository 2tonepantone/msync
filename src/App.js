import SearchFormComponent from './components/SearchFormComponent'
import NavbarComponent from './components/NavbarComponent';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <main>
      <NavbarComponent />
      <Outlet />
    </main>
  )
}

export default App;
