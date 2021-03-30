import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createItem, editItem } from '../redux/actions/listActions';

const Create = ({ input }) => {
  console.log('input **', input);

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setField1(input.name);
    setField2(input.job);
  }, [input]);

  const createRecord = () => {
    if (input.id)
      dispatch(editItem(input.id, {name: field1, job: field2}));
    else
      dispatch(createItem(field1, field2));

    setField1('');
    setField2('');
  };

  return (<>
    <br /><br />
    <label>Name</label>
    <input type="text" placeholder="" value={field1} onChange={(e) => setField1(e.target.value)} />

    <br /><br />
    <label>Job</label>
    <input type="text" placeholder="" value={field2} onChange={(e) => setField2(e.target.value)} />

    <br /><br />
    <button onClick={createRecord}>Update list</button>
  </>);
};

export default Create;

// {name: "morpheus", job: "leader"}