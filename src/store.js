// using DaveGray method of creating store(not Brad's one)
import { createStore, action, computed } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';

export default createStore({
  // SIDEBAR:
  isSidebarOpen: false,

  // to make it two separate functions (and not toggle) is more convenient.
  openSidebar: action((state) => {
    state.isSidebarOpen = true;
  }),

  closeSidebar: action((state) => {
    state.isSidebarOpen = false;
  }),

  // FORM:
  formName: '',

  setFormName: action((state, payload) => {
    state.formName = payload;
  }),

  formSteps: [
    { step: '', completed: false },
    { step: '', completed: false },
    { step: '', completed: false },
  ],

  setFormSteps: action((state, payload) => {
    state.formSteps = payload; // probably will accept array, right?
  }),

  moreFields: action((state) => {
    // to add more steps is easy.
    state.formSteps = [...state.formSteps, { step: '', completed: false }];
  }),

  lessFields: action((state) => {
    // we wanna only do all that if we have more than 1 field.
    if (state.formSteps.length > 1) {
      const newSteps = [...state.formSteps]; //
      newSteps.pop();
      state.formSteps = [...newSteps];
    }
  }),

  // LIST:
  steppiesList: [],

  // we need these setter for LS and later for DND.
  setSteppiesList: action((state, payload) => {
    state.steppiesList = payload;
  }),

  // this one we need to put near our hamburger button.
  steppiesCount: computed((state) => state.steppiesList.length),

  // just iterating over existing array and return done property
  // of true if id's match.
  // these two will be watching on useEffect and it just trigger that setter fn
  // with id argument. (this is not checkboxes, this is whole steppi)
  setSteppiDone: action((state, payload) => {
    state.steppiesList.map((el) => {
      if (el.id === payload) {
        el.done = true;
      }
      return el;
    });
  }),

  // same for undone.
  setSteppiUndone: action((state, payload) => {
    state.steppiesList.map((el) => {
      if (el.id === payload) {
        el.done = false;
      }
      return el;
    });
  }),

  // for showing and hiding toggle is okay
  // that property has each steppi (true by default)
  toggleSteppiShown: action((state, payload) => {
    state.steppiesList.map((el) => {
      if (el.id === payload) {
        el.isShown = !el.isShown;
      }
      return el;
    });
  }),

  addSteppi: action((state, payload) => {
    // have boolean value that checks if all fields are NOT empty.
    const filled = state.formSteps.every((obj) => {
      return obj.step !== '';
    });

    // if no name OR one of the field is empty -> danger ALERT.
    if (!state.formName || !filled) {
      state.alert = { show: true, msg: 'please write the name and all steps', type: 'danger' };
    } else {
      // else we give that payload object we send a new id (uuid)
      payload.id = uuidv4();
      // and put it at the end of the list,
      state.steppiesList = [...state.steppiesList, payload];

      // we don't need to use setter funcion, since we have the actual state
      // just give it new values
      state.formSteps = [
        { step: '', completed: false },
        { step: '', completed: false },
        { step: '', completed: false },
      ];
      state.formName = '';
      state.alert = { show: true, msg: 'new steppi has been added', type: 'success' };
    }
  }),

  // super basic filtering.
  deleteSteppi: action((state, payload) => {
    // look how cool redux is behaving. we just rewrite that 'state'.
    // no need for setters in store
    state.steppiesList = state.steppiesList.filter((steppi) => steppi.id !== payload);
    state.alert = { show: true, msg: 'you deleted a steppi', type: 'success' };
  }),

  // this action accepts object with two properties in payload
  // it's actually checks the steps.
  checkSteppi: action((state, payload) => {
    const { id, idx } = payload; // destructure it

    state.steppiesList.map((obj) => {
      // if id of steppi matches
      if (obj.id === id) {
        // we iterate over steppi property (array)
        obj.steps.map((step, _idx) => {
          // we grab checking this _idx with idx from payload.
          if (idx === _idx) {
            // and toggle the state of the .completed property.
            step.completed = !step.completed;
          }
          return step;
        });
      }
      return obj;
    });
  }),

  // EDIT:
  editId: '', // empty for now

  isEditing: false, // kinda flag

  // setter of that flag.
  setIsEditing: action((state, payload) => {
    state.isEditing = payload;
  }),

  editSteppi: action((state, payload) => {
    // we need to filter our list and find one object
    // somehow it gives strange Proxy(Object)..
    const proxyObject = state.steppiesList.filter((obj) => {
      return obj.id === payload;
    });

    // but we could PARSE-stringify this proxy object and grab the [0] element
    // so it will be our steppi that we filtered
    const certainSteppi = JSON.parse(JSON.stringify(proxyObject))[0];

    // than we set our form state to that steppi.name
    // our array of steps to that certain steppi steps
    // and edit id to that certain steppi id
    state.formName = certainSteppi.steppiName;
    state.formSteps = certainSteppi.steps;
    state.editId = certainSteppi.id;
  }),

  // we need this helper state
  indexToPaste: null,

  // very similar to addSteppi action
  addEditedSteppi: action((state, payload) => {
    const filled = state.formSteps.every((obj) => {
      return obj.step !== '';
    });

    // function that makes sure we paste that edited element back on it's place
    // in array
    function insertAtIndex(array, object, index) {
      return [...array.slice(0, index), object, ...array.slice(index)];
    }

    // if no name and one of the fileds is empty - danger ALERT
    if (!state.formName || !filled) {
      state.alert = { show: true, msg: 'please write the name and all steps', type: 'danger' };
    } else {
      // we need to smart filter that. if element is same as editId, we highlight that
      // index that we want to paste (AND we don't return in) else we just return the element
      state.steppiesList = state.steppiesList.filter((el, index) => {
        if (el.id === state.editId) {
          state.indexToPaste = index;
        } else {
          return el;
        }
      });

      // we give it the same id as stateId (wait, is it necessary?)
      payload.id = state.editId;
      // and we use that smart fn that pastes where we want!
      state.steppiesList = insertAtIndex(state.steppiesList, payload, state.indexToPaste);

      // than we set form steps to empties, form name, setting successful alert
      // editId back to '', state of editing back to false, index to paste back to null.
      state.formSteps = [
        { step: '', completed: false },
        { step: '', completed: false },
        { step: '', completed: false },
      ];
      state.formName = '';
      state.alert = { show: true, msg: 'you edited your steppi successfully!', type: 'success' };
      state.editId = '';
      state.isEditing = false;
      state.indexToPaste = null;
    }
  }),

  // ALERT:
  // where simple state and setter.
  alert: { show: false, msg: '', type: '' },

  setAlert: action((state, payload) => {
    state.alert = payload;
  }),
});
