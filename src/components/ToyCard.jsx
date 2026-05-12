import React from "react";

function ToyCard({toy, addLiking, addDelete}) {

  function handleLikings() {
    fetch(`http://localhost:3001/toys/${toy.id}`,
      {
        method : 'PATCH',
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify({likes : toy.likes +1})
      }
    )
    .then((response) => {
      if(!response.ok){
        throw new Error('Error')
      }else{
        return response.json()
      }
    })
    .then((newLike) => {
      addLiking(newLike)
    })
    .catch((error) => console.log(error))
  }


  function handleDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`,
      {
        method : 'DELETE'
      }
    )
    .then((response) => {
      if(!response.ok){
        throw new Error('Error')
      }else{
        return response.json()
      }
    })
    .then((deletedToy) => {
      addDelete(deletedToy)
    })
    .catch((error) => console.log(error))
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name /* Toy's Name */}</h2>
      {toy.image && 
      <img
        src={toy.image /* Toy's Image */}
        alt={"Toys image" /* Toy's Name */}
        className="toy-avatar"
      />
      }
      <p>{toy.likes/* Toy's Likes */} Likes </p>
      <button className="like-btn" onClick={handleLikings}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
