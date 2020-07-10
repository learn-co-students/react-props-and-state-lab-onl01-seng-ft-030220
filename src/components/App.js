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

  handleTypeChange = value => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          type: value
        }
      }
    })
  }

  handleFindPetsClick = () => {
    const type = this.state.filters.type
    let url
    if (type === 'all') {
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${type}`
    }

    fetch(url)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        pets: json
      })
    })
  }

  handleAdoptPet = id => {
    this.setState(prevState => {
   
      const prevPets = prevState.pets
      const petIndex = prevPets.findIndex(pet => pet.id === id)

      prevPets[petIndex].isAdopted = true
      return {
        pets: prevPets
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
                onFindPetsClick={this.handleFindPetsClick} 
                onChangeType={this.handleTypeChange} 
                type={this.state.filters.type} 
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets} 
                onAdoptPet={this.handleAdoptPet} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App