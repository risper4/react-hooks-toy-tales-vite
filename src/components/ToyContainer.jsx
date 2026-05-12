import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys = [], addLiking, addDelete}) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (<ToyCard key = {toy.id} toy = {toy} addLiking = {addLiking} addDelete = {addDelete}/>))}
    </div>
  );
}

export default ToyContainer;
