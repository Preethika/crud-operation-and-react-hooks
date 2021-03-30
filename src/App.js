import {Provider} from 'react-redux';
import Create from './Components/create';
import List from './Components/list';
import store from './redux/store';
import './App.css';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState({name:'', job:''});

const editingItem = (id, first_name, job)=>{
  setInput({
    id,
    name: first_name,
    job
  });
};

  return (
    <Provider store={store}>
      <div className="App">
        <Create input = {input} />
        <List editingItem={editingItem} />
      </div>
    </Provider>
  );
}

export default App;
