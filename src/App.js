import { useState, useEffect } from 'react';
import Axios from 'axios';

import './App.css';
import axios from 'axios';

function App() {

  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  // Update
  const [newFoodName, setNewFoodName] = useState('')

  const [foodList, setFoodList] = useState([]);

  

  useEffect(() => {
    axios.get('http://localhost:3001/read').then((res)=>{
      setFoodList(res.data)
    })
  }, [])


  const addToList = () => {
    Axios.post("http://localhost:3001/insert",{
      foodName: foodName, 
      days: days
    });
  }

  const updateFood = (id) => {
    axios.put('http://localhost:3001/update',{
      id: id,
      newFoodName: newFoodName
    });
  }

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  }

  return (
    <div className="App">
      <h1>
        Crud app with MERN
      </h1>

      <label>Food Name:</label>
      <input type="text" onChange={
        (e) => setFoodName(e.target.value)
      } />
      <label>Days Since You Ate it:</label>
      <input type="number" onChange={
        (e) => setDays(e.target.value)
      }/>
      <button onClick={addToList}>Add To List</button>
      <hr/>
      <h2>
        Food List
        {
          foodList.map((val, key) => {
            return( 
              <div key={key} className="update-delete"> 
                {""}
                <div className="foodName">
                  <h2> {val.foodName} </h2>
                </div>
                <div className="daysSinceIAte">
                  <h2> {val.daysSinceIAte} </h2>
                </div>
                <div className="new-food-name">
                  <input type="text" placeholder="New Food Name..." onChange={
                    (e) => setNewFoodName(e.target.value)
                  }/>
                </div>
                <div className="update">
                  <button onClick={
                    () => {
                      updateFood(val._id)
                    }
                  }>Update</button>
                </div>
                <div className="delete">
                  <button onClick={
                    () => deleteFood(val._id)
                  }>Delete</button>
                </div>
              </div>
            )
          })
        }
      </h2>
    </div>
  );
}

export default App;
