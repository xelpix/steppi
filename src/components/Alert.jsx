import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

function Alert() {
  const alert = useStoreState((store) => store.alert);
  const setAlert = useStoreActions((actions) => actions.setAlert);

  // this is kind slow infinite loop with 3000 ms step
  // because of our [alert] dependency,
  // but it's okay here... I guess O_o
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ show: false, msg: '', type: '' });
    }, 3000);
    // cleanup fn.
    return () => clearTimeout(timeout);
  }, [alert]);

  return <section className={`alert ${alert.type}`}>{alert.show && <p>{alert.msg}</p>}</section>;
}

export default Alert;
