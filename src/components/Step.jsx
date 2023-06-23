import { useStoreActions } from 'easy-peasy';

// we need to receive steppi,
function Step({ steppi, step, index }) {
  const checkSteppi = useStoreActions((actions) => actions.checkSteppi);

  // we could do just checkSteppi inline, but.. ok!
  const handleCheck = (id, idx) => {
    // to make this work I need to pass object as payload,
    // with id of the steppi and idx of the step.
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
