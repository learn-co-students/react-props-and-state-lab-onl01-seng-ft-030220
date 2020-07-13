import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFilter = event => {
    this.setState({
      filters: {
        type: event.target.value,
      }
    });
  }

  retrievePetInfo = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({
              pets: result
            })
          }
        )
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pets: result
          })
        }
      )
    }
  }

  onAdoptPet = (petID) => {
    let updatedPets = this.state.pets
    let petIndex = this.state.pets.findIndex(pet => pet.id === petID)
    updatedPets[petIndex].isAdopted = true;
    this.setState({
      pets: updatedPets
    });
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
              <Filters onChangeType={this.updateFilter} onFindPetsClick={this.retrievePetInfo}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App