import './index.scss';
import Sidebar from './components/Sidebar';
import Form from './components/Form';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Alert from './components/Alert';
import { GiHamburgerMenu } from 'react-icons/gi';

function App() {
  const steppiesList = useStoreState((state) => state.steppiesList);
  const setSteppiesList = useStoreActions((state) => state.setSteppiesList);
  const openSidebar = useStoreActions((actions) => actions.openSidebar);

  const steppiesCount = useStoreState((state) => state.steppiesCount);

  useEffect(() => {
    const steppiesListFromLs = localStorage.getItem('steppies-list');
    const data = steppiesListFromLs ? JSON.parse(steppiesListFromLs) : [];
    setSteppiesList(data);
  }, []);

  useEffect(() => {
    localStorage.setItem('steppies-list', JSON.stringify(steppiesList));
  }, [steppiesList]);

  return (
    <div className="App">
      <button className="open-sidebar-btn" onClick={openSidebar}>
        <GiHamburgerMenu />
        {steppiesCount ? <p className="steppies-amount">{steppiesCount}</p> : null}
      </button>
      <Sidebar />
      <Form />
      <Alert />
    </div>
  );
}

export default App;
