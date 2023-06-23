import { useStoreState } from 'easy-peasy';
import List from './List';
import { FaTimes } from 'react-icons/fa';
import { useStoreActions } from 'easy-peasy';

function Sidebar() {
  const isSidebarOpen = useStoreState((state) => state.isSidebarOpen);
  const closeSidebar = useStoreActions((actions) => actions.closeSidebar);

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="close-sidebar-btn" onClick={closeSidebar}>
        <FaTimes />
      </button>
      <List />
    </aside>
  );
}

export default Sidebar;
