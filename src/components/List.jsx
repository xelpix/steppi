import { useStoreActions, useStoreState } from 'easy-peasy';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Steppi from './Steppi';

function List() {
  const steppiesList = useStoreState((state) => state.steppiesList);
  const setSteppiesList = useStoreActions((actions) => actions.setSteppiesList);

  // these dnd library mumbo-jumbo
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // we kinda create new array, splice it, twist it, put it back...
    const newItems = Array.from(steppiesList);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    // and set it in store.
    setSteppiesList(newItems);
  };

  // partly dnd logic was copied from one of my smilga's project (chatGPT version of it)
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
                        // we should pass the provided here as a prop!
                        // to be able to make handle working
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
