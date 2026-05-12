import React, { useState } from "react";

function ToyForm({toys, addingToys}) {
  const [formData, setFormData] = useState({
    name : '',
    image : ''
  })

  function handleSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:3001/toys',
      {
        method : 'POST',
        header : {
          'Content-type':'application/json'
        },
        body : JSON.stringify(formData)
      }
    )
    .then((response) => {
      if(!response.ok){
        throw new Error('Error')
      }else{
        return response.json()
      }
    })
    .then((newToy) => {
      addingToys(newToy)
      setFormData({
        name : '',
        image : ''
      })
    })
  }

  function handleChange(event) {
    setFormData((prev) => ({...prev, [event.target.name] : event.target.value}) )
  }
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
