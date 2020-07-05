import React from 'react'
// import './fetch-setup';
// import { getAll, getByType } from '.src/data/pets.js';
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


  updateFilterType = (e) => {
    const val = e.target.value
    this.setState(prevState => {
      return {
        ...prevState,
        filters: {
          type: val
        }
      }
    })
  }

  findPetsClick = (e) => {
    const filterType = this.state.filters.type
    let url = '/api/pets'
    
    if (filterType !== 'all') {
      url += `?type=${filterType}`
    } 
    debugger
  }

  handleAdoptPet = (id) => {
    this.setState(prevState => {
      const pet = prevState.pets.find(pet => pet.id === id)
      return {
        ...prevState,
        pets: []
      }
    })
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
              <Filters 
              onChangeType={(e) => this.updateFilterType(e)}
              onFindPetsClick={(e) => this.findPetsClick(e)}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={(id) => this.handleAdoptPet(id)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
