import { useStoreActions } from 'easy-peasy';

function Step({ steppi, step, index }) {
  const checkSteppi = useStoreActions((actions) => actions.checkSteppi);

  const handleCheck = (id, idx) => {
    checkSteppi({ id, idx });
  };

  return (
    <li className="list-step" key={index}>
      <input
        type="checkbox"
        checked={step.completed}
        onChange={() => handleCheck(steppi.id, index)}
      />
      <label
        onDoubleClick={() => handleCheck(steppi.id, index)}
        style={step.completed ? { textDecoration: 'line-through' } : null}
      >
        {step.step}
      </label>
    </li>
  );
}

export default Step;
