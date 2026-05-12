import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(response => {
      if(!response.ok){
        throw new Error('Error')
      }else{
        return response.json()
      }
    })
    .then((data) => setToys(data))
    .catch((error) => console.log('Fetching failed', error))
  })

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addingToys(newToy) {
    setToys((prevToy) => {
      [...prevToy, newToy]
    })
  }

  function addLiking(newLike){
    const likings = toys.map((toy) => {
      if(toy.id === newLike.id){
        return newLike
      }else{
        return toy
      }
    })
    setToys(likings)
  }

  function addDelete(deletedToy) {
    const deleteItem = toys.filter((toy) => {
      toy.id !== deletedToy.id
    })
    setToys(deleteItem)
  }
  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys = {toys} addLiking = {addLiking} addDelete = {addDelete}/>
      <ToyForm toys = {toys} addingToys = {addingToys}/>
    </>
  );
}

export default App;
