import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  const url = "https://dogssd1207.herokuapp.com"
  // state for the list of dogs
  const [dogs, setDogs] = React.useState([])
  
  // Create Empty DOg - model for form inputs
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }
  // sets state for to reack and edit dogs
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)
  // Create handle create function - used to create dogs from forms
  const handleCreate = (newDog)=> {
    fetch(url + "/dog", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog)
    })
    .then(()=>{
      getDogs()
    })
  }
  // function to get list of dogs
  const getDogs = () => {
    fetch(url + "/dog")
    .then(res => res.json())
    .then(data =>{
      setDogs(data)
    })
  }
  React.useEffect(()=>{getDogs()}, [])
  const selectDog =(dog)=>{
    setSelectedDog(dog)
  }
  const handleUpdate = (dog)=>{
    fetch(url+"/dog/"+dog._id, {
      method: "put",
      headers: {
      "Content-Type": "application/json"
      }, 
      body: JSON.stringify(dog)
    })
    .then(()=>{
      getDogs()
    })
  }
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })
    .then(() => {
      getDogs()
    })
  }
  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>

      <Link to="/create">
        <button>Create a Dog</button>
      </Link>
      <hr />
      <main>
        <Switch>
            <Route exact path="/" 
            render={(rp) => <Display {...rp} dogs={dogs} selectDog={selectDog} deleteDog={deleteDog}/> } />
            <Route exact path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
