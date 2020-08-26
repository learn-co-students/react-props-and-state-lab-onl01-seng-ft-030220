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
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      this.setState(prevState => {
        return {
          ...prevState,
          pets: data
        }
      })
    })
  }

  handleAdoptPet = (id) => {
    this.setState(prevState => {
      const pet = prevState.pets.find(pet => pet.id === id)
      pet.isAdopted = true
      return {
        ...prevState
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
              onChangeType={this.updateFilterType}
              onFindPetsClick={this.findPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App