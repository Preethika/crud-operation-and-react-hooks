import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listItems, editItem, deleteItem } from '../redux/actions/listActions';

const List = ({ editingItem }) => {
  const { list } = useSelector(state => state.listReducer);
  const dispatch = useDispatch();

  //componentDidMount
  useEffect(() => {
    dispatch(listItems());
  }, []);

  const onEdit = (id, first_name, job) => {
    editingItem(id, first_name, job);
  };

  const onDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div style={{ width: '50%' }}>
      <h2>List of items</h2>
      {list && list.map(({ id, first_name, last_name, email }, index) =>
        <div key={id}
          style={{ padding: '5px', margin: '15px', border: '0.5px solid grey' }} >
          <span>{first_name} {last_name}</span>
          <br />
          <span>{email}</span>
          <br />
          <button onClick={() => onEdit(id, first_name, email)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>

        </div>)}
    </div>);
};

export default List;
