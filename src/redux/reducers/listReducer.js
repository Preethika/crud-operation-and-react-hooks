import {
  FETCH_LIST_ITEMS, LIST_ITEMS_SUCCESS, LIST_ITEMS_ERROR,
  START_CREATE_ITEM, CREATE_ITEM_SUCCESS, CREATE_ITEM_ERROR,
  START_EDIT_ITEM, EDIT_ITEM_SUCCESS, EDIT_ITEM_ERROR,
  START_DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_ERROR
} from '../actionConstants';

const initialState = {
  isFetching: false,
  list: [],
  error: null
};

const listReducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_LIST_ITEMS:
      return { ...state, isFetching: true };

    case LIST_ITEMS_SUCCESS:
      return { ...state, isFetching: false, list: action.payload };

    case LIST_ITEMS_ERROR:
      return { ...state, isFetching: false, error: action.payload };


    case START_CREATE_ITEM:
      return { ...state, isFetching: true };
    
    case CREATE_ITEM_SUCCESS:
      return { ...state, isFetching: false, list: [...state.list, action.payload] };
  
    case CREATE_ITEM_ERROR:
      return { ...state, isFetching: false, error: action.payload };
  


    case START_EDIT_ITEM:
      return {...state, isFetching: true};

    case EDIT_ITEM_SUCCESS:
      return {...state, isFetching: false, list: action.payload};

    case EDIT_ITEM_ERROR:
      return {...state, isFetching: false, error: action.payload};


    case START_DELETE_ITEM:
      return {...state, isFetching: true};

    case DELETE_ITEM_SUCCESS:
      return {...state, isFetching: false, list: action.payload};

    case DELETE_ITEM_ERROR:
      return {...state, isFetching: false, error: action.payload};


    default:
      return state;
  }
};
export default listReducer;