import { useStoreActions, useStoreState } from 'easy-peasy';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Steppi from './Steppi';

function List() {
  const steppiesList = useStoreState((state) => state.steppiesList);
  const setSteppiesList = useStoreActions((actions) => actions.setSteppiesList);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(steppiesList);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setSteppiesList(newItems);
  };

  return (
    <div className="list">
      <h2 className="steppies-title">Steppies:</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="steppies">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {steppiesList.map((steppi, index) => (
                <Draggable key={steppi.id} draggableId={steppi.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <Steppi
                        provided={provided}
                        id={steppi.id}
                        key={steppi.id}
                        steppi={steppi}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default List;
