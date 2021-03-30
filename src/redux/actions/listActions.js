import {
  FETCH_LIST_ITEMS, LIST_ITEMS_SUCCESS, LIST_ITEMS_ERROR,
  START_CREATE_ITEM, CREATE_ITEM_SUCCESS, CREATE_ITEM_ERROR,
  START_EDIT_ITEM, EDIT_ITEM_SUCCESS, EDIT_ITEM_ERROR,
  START_DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_ERROR
} from '../actionConstants';
import { baseUrl, getAll } from '../../constants';

export const listItems = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_LIST_ITEMS });

    fetch(`${baseUrl}${getAll}`)
      .then(res => res.json())
      .then(data => {
        return dispatch({ type: LIST_ITEMS_SUCCESS, payload: data.data });
      })
      .catch(err => dispatch({ type: LIST_ITEMS_ERROR, payload: err }));

  };
};

export const createItem = (name, job) => {
  return (dispatch) => {
    dispatch({ type: START_CREATE_ITEM });

    fetch(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify({ name, job })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          let newData = {
            id: data.id,
            first_name: name,
            last_name: '',
            email: `${name}@${job}.com`
          };

          return dispatch({ type: CREATE_ITEM_SUCCESS, payload: newData });
        } else
          dispatch({ type: CREATE_ITEM_ERROR, payload: 'Error in creating item' });
      })
      .catch(err => dispatch({ type: CREATE_ITEM_ERROR, payload: err }));

  };
};


export const editItem = (id, data) => (dispatch, getState) => {
  dispatch({ type: START_EDIT_ITEM });

  fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(resData => {
      if (resData) {
        let { list } = getState().listReducer;

        let editedData = {
          id: id,
          first_name: data.name,
          last_name: '',
          email: `${data.name}@${data.job}.com`
        };
        let editedList = [ ...list ];
        editedList = editedList.filter(item => item.id !== id);
        console.log('edited 1', editedList);
        editedList.push(editedData);
        console.log('edited 2', editedList);

        dispatch({ type: EDIT_ITEM_SUCCESS, payload: editedList })
      } else
        dispatch({ type: EDIT_ITEM_ERROR, payload: 'Error in editing item' });
    })
    .catch(err => dispatch({ type: EDIT_ITEM_ERROR, payload: err }));

};


export const deleteItem = (id) => (dispatch, getState) => {
  dispatch({ type: START_DELETE_ITEM });

  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then(res => {
    if (res.ok) {
      //remove the item that matches the id
      let { list } = getState().listReducer;
      let data = list.filter(item => item.id !== id);

      dispatch({ type: DELETE_ITEM_SUCCESS, payload: data });

    } else {
      dispatch({ type: DELETE_ITEM_ERROR, payload: `Error in deleting ${id}` });
    }
  })
    .catch(err => dispatch({ type: DELETE_ITEM_ERROR, payload: err }));

};

