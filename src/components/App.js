import React, { Component } from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends Component {
  state = {
    pets: [],
    filters: {
      type: 'all'
    }
  }

  changeType = (e) => {
    return this.setState({
      filters: {
        type: e.target.value
      }
    })
  }


  fetchPets = () => {
    let endPoint = `/api/pets`
    if(['cat', 'dog', 'micropig'].includes(this.state.filters.type)) {
      endPoint += `?type=${this.state.filters.type}`
    }
    fetch(endPoint)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pets: data
        })
      })
  }

  adoptPet = petId => {

    let pet = this.state.pets.find(pet => pet.id === petId)
    pet.isAdopted = true
    debugger;
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
