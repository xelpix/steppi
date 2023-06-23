import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

function Alert() {
  const alert = useStoreState((store) => store.alert);
  const setAlert = useStoreActions((actions) => actions.setAlert);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ show: false, msg: '', type: '' });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return <section className={`alert ${alert.type}`}>{alert.show && <p>{alert.msg}</p>}</section>;
}

export default Alert;
