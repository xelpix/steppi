import { useEffect } from 'react';
import { FaPen, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { RxDragHandleHorizontal } from 'react-icons/rx';

import Step from './Step';

function Steppi({ steppi, provided }) {
  const steppiesList = useStoreState((state) => state.steppiesList);
  const deleteSteppi = useStoreActions((actions) => actions.deleteSteppi);

  const editSteppi = useStoreActions((actions) => actions.editSteppi);
  const setIsEditing = useStoreActions((actions) => actions.setIsEditing);
  const setSteppiDone = useStoreActions((actions) => actions.setSteppiDone);
  const setSteppiUndone = useStoreActions((actions) => actions.setSteppiUndone);
  const toggleSteppiShown = useStoreActions((actions) => actions.toggleSteppiShown);

  const closeSidebar = useStoreActions((actions) => actions.closeSidebar);

  const handleEdit = (id) => {
    closeSidebar();
    setIsEditing(true);
    editSteppi(id);
  };

  useEffect(() => {
    steppiesList.forEach((steppi) => {
      const allCompleted = steppi.steps.every((step) => step.completed);

      if (allCompleted) {
        setSteppiDone(steppi.id);
      } else {
        setSteppiUndone(steppi.id);
      }
    });
  }, [steppiesList]);

  return (
    <div>
      <div className="list-steppi-header">
        <div className="drag-area" {...provided.dragHandleProps}>
          <RxDragHandleHorizontal />
        </div>
        <h3 className={`steppi-name ${steppi.done ? 'done' : ''}`}>{steppi.steppiName}</h3>
        <div className="list-steppi-btns-container">
          <button
            className="list-btn show-steps-btn"
            onClick={() => {
              toggleSteppiShown(steppi.id);
            }}
            aria-label="show-steps-btn"
          >
            {steppi.isShown ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <button
            className="list-btn edit-btn"
            onClick={() => handleEdit(steppi.id)}
            aria-label="edit-btn"
          >
            <FaPen />
          </button>
          <button
            className="list-btn delete-btn"
            onClick={() => deleteSteppi(steppi.id)}
            aria-label="delete-btn"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className={`list-steps-wrapper ${steppi.isShown ? 'show-list' : ''}`}>
        {steppi.steps.map((step, index) => {
          return <Step key={index} steppi={steppi} step={step} index={index} />;
        })}
      </div>
    </div>
  );
}

export default Steppi;
