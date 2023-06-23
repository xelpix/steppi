import { createStore, action, computed } from 'easy-peasy';
import { v4 as uuidv4 } from 'uuid';

export default createStore({
  // SIDEBAR:
  isSidebarOpen: false,

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
    state.formSteps = payload;
  }),

  moreFields: action((state) => {
    state.formSteps = [...state.formSteps, { step: '', completed: false }];
  }),

  lessFields: action((state) => {
    if (state.formSteps.length > 1) {
      const newSteps = [...state.formSteps]; //
      newSteps.pop();
      state.formSteps = [...newSteps];
    }
  }),

  // LIST:
  steppiesList: [],

  setSteppiesList: action((state, payload) => {
    state.steppiesList = payload;
  }),

  steppiesCount: computed((state) => state.steppiesList.length),

  setSteppiDone: action((state, payload) => {
    state.steppiesList.map((el) => {
      if (el.id === payload) {
        el.done = true;
      }
      return el;
    });
  }),

  setSteppiUndone: action((state, payload) => {
    state.steppiesList.map((el) => {
      if (el.id === payload) {
        el.done = false;
      }
      return el;
    });
  }),

  toggleSteppiShown: action((state, payload) => {
    state.steppiesList.map((el) => {
      if (el.id === payload) {
        el.isShown = !el.isShown;
      }
      return el;
    });
  }),

  addSteppi: action((state, payload) => {
    const filled = state.formSteps.every((obj) => {
      return obj.step !== '';
    });

    if (!state.formName || !filled) {
      state.alert = { show: true, msg: 'please write the name and all steps', type: 'danger' };
    } else {
      payload.id = uuidv4();
      state.steppiesList = [...state.steppiesList, payload];

      state.formSteps = [
        { step: '', completed: false },
        { step: '', completed: false },
        { step: '', completed: false },
      ];
      state.formName = '';
      state.alert = { show: true, msg: 'new steppi has been added', type: 'success' };
    }
  }),

  deleteSteppi: action((state, payload) => {
    state.steppiesList = state.steppiesList.filter((steppi) => steppi.id !== payload);
    state.alert = { show: true, msg: 'you deleted a steppi', type: 'success' };
  }),

  checkSteppi: action((state, payload) => {
    const { id, idx } = payload; // destructure it

    state.steppiesList.map((obj) => {
      if (obj.id === id) {
        obj.steps.map((step, _idx) => {
          if (idx === _idx) {
            step.completed = !step.completed;
          }
          return step;
        });
      }
      return obj;
    });
  }),

  // EDIT:
  editId: '',

  isEditing: false,

  setIsEditing: action((state, payload) => {
    state.isEditing = payload;
  }),

  editSteppi: action((state, payload) => {
    const proxyObject = state.steppiesList.filter((obj) => {
      return obj.id === payload;
    });

    const certainSteppi = JSON.parse(JSON.stringify(proxyObject))[0];

    state.formName = certainSteppi.steppiName;
    state.formSteps = certainSteppi.steps;
    state.editId = certainSteppi.id;
  }),

  indexToPaste: null,

  addEditedSteppi: action((state, payload) => {
    const filled = state.formSteps.every((obj) => {
      return obj.step !== '';
    });

    function insertAtIndex(array, object, index) {
      return [...array.slice(0, index), object, ...array.slice(index)];
    }

    if (!state.formName || !filled) {
      state.alert = { show: true, msg: 'please write the name and all steps', type: 'danger' };
    } else {
      state.steppiesList = state.steppiesList.filter((el, index) => {
        if (el.id === state.editId) {
          state.indexToPaste = index;
        } else {
          return el;
        }
      });

      payload.id = state.editId;
      state.steppiesList = insertAtIndex(state.steppiesList, payload, state.indexToPaste);

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
  alert: { show: false, msg: '', type: '' },

  setAlert: action((state, payload) => {
    state.alert = payload;
  }),
});
