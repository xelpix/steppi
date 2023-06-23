import { useEffect } from 'react';
import { FaPen, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { RxDragHandleHorizontal } from 'react-icons/rx';

import Step from './Step';

// we need this provided guy from top to destructure it to make a handle
function Steppi({ steppi, provided }) {
  const steppiesList = useStoreState((state) => state.steppiesList);
  const deleteSteppi = useStoreActions((actions) => actions.deleteSteppi);

  const editSteppi = useStoreActions((actions) => actions.editSteppi);
  const setIsEditing = useStoreActions((actions) => actions.setIsEditing);
  const setSteppiDone = useStoreActions((actions) => actions.setSteppiDone);
  const setSteppiUndone = useStoreActions((actions) => actions.setSteppiUndone);
  const toggleSteppiShown = useStoreActions((actions) => actions.toggleSteppiShown);

  const closeSidebar = useStoreActions((actions) => actions.closeSidebar);

  // should I write it in a sep handleDelete fn for consistency ?
  // like:
  // const handleDelete = () => {}
  // for now I'll skip it.
  const handleEdit = (id) => {
    closeSidebar();
    setIsEditing(true);
    editSteppi(id);
  };

  // on this uE we listen steppiesList. if it changes..
  // we check each steppi of the list on completion
  useEffect(() => {
    steppiesList.forEach((steppi) => {
      // here it should return true if all steps are completed
      const allCompleted = steppi.steps.every((step) => step.completed);

      // if so, we set steppieDone (passing the id)
      if (allCompleted) {
        setSteppiDone(steppi.id);
      } else {
        // if not, we passing the id to unDone fn.
        setSteppiUndone(steppi.id);
      }
    });
  }, [steppiesList]);

  // see how simple is to create draggable area
  return (
    <div>
      <div className="list-steppi-header">
        {/* HERE! */}
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

      {/* decided to abstract it even further */}
      <div className={`list-steps-wrapper ${steppi.isShown ? 'show-list' : ''}`}>
        {steppi.steps.map((step, index) => {
          return <Step key={index} steppi={steppi} step={step} index={index} />;
        })}
      </div>
    </div>
  );
}

export default Steppi;
