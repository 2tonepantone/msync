import SearchFormComponent from './components/SearchFormComponent'
import './App.css'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Container>
      <SearchFormComponent/>
      <Outlet />
    </Container>
  );
}

export default App;
