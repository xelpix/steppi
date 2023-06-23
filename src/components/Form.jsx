import { useStoreActions, useStoreState } from 'easy-peasy';

function Form() {
  const formName = useStoreState((state) => state.formName);
  const setFormName = useStoreActions((actions) => actions.setFormName);

  const formSteps = useStoreState((state) => state.formSteps);
  const setFormSteps = useStoreActions((actions) => actions.setFormSteps);

  const moreFields = useStoreActions((actions) => actions.moreFields);
  const lessFields = useStoreActions((actions) => actions.lessFields);

  const addSteppi = useStoreActions((actions) => actions.addSteppi);

  const isEditing = useStoreState((store) => store.isEditing);
  const addEditedSteppi = useStoreActions((actions) => actions.addEditedSteppi);

  const handleFormName = (e) => {
    setFormName(e.target.value);
  };

  const handleFormSteppies = (e, index) => {
    const steps = [...formSteps];
    steps[index]['step'] = e.target.value;
    setFormSteps(steps);
  };

  const submitSteppi = (e) => {
    e.preventDefault();

    const steppiObj = {
      steppiName: formName,
      done: false,
      isShown: true,
      steps: formSteps,
    };

    if (!isEditing) {
      addSteppi(steppiObj);
    }

    if (isEditing) {
      addEditedSteppi(steppiObj);
    }
  };

  return (
    <main className="form-section">
      <form onSubmit={submitSteppi}>
        <input
          type="text"
          placeholder="name of your steppi"
          value={formName}
          onChange={(e) => handleFormName(e)}
        />
        <div className="buttons">
          <button className="amount-btn btn" type="button" onClick={lessFields}>
            less steps
          </button>
          <button className="amount-btn btn" type="button" onClick={moreFields}>
            more steps
          </button>
        </div>

        {formSteps.map((el, index) => {
          return (
            <div key={index}>
              <input
                type="text"
                placeholder="#step"
                value={el.step}
                onChange={(e) => handleFormSteppies(e, index)}
              />
            </div>
          );
        })}

        <br />

        <button className="add-btn btn" type="submit">
          {isEditing ? 'Edit' : 'Add'}
        </button>
      </form>
    </main>
  );
}

export default Form;
