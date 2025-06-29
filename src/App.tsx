import './components/style/app.css';
import { Routes, Route } from 'react-router-dom';
import Detailpage from './components/pages/detailpage/Detailpage';
import Favouritepage from './components/pages/favouritepage/Favouritepage';
import Searchpage from './components/pages/searchpage/Searchpage';
import Homepage from './components/pages/homepage/Homepage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='movie/:id' element={<Detailpage />} />
        <Route path='favorites' element={<Favouritepage />} />
        <Route path='search' element={<Searchpage />} />
      </Route>
    </Routes>
  );
}

export default App;
