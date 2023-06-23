import './index.scss';
import Sidebar from './components/Sidebar';
import Form from './components/Form';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Alert from './components/Alert';
import { GiHamburgerMenu } from 'react-icons/gi';

function App() {
  // states and actions we need from our store
  const steppiesList = useStoreState((state) => state.steppiesList);
  const setSteppiesList = useStoreActions((state) => state.setSteppiesList);
  const openSidebar = useStoreActions((actions) => actions.openSidebar);

  // we need this computed value from store to put it near hamburger menu.
  const steppiesCount = useStoreState((state) => state.steppiesCount);

  // LS getter should be before setter.
  useEffect(() => {
    const steppiesListFromLs = localStorage.getItem('steppies-list');
    const data = steppiesListFromLs ? JSON.parse(steppiesListFromLs) : [];
    // if we launch the app first time, we set the steppiesList to [], else
    // to what comes from LS. this is function from our store.
    setSteppiesList(data);
  }, []);

  // we listen steppiesList array and set SL every time it changes.
  useEffect(() => {
    localStorage.setItem('steppies-list', JSON.stringify(steppiesList));
  }, [steppiesList]);

  // very simple structure here.
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
