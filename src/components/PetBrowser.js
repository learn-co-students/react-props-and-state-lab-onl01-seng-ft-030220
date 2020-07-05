import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  // handleSomething = () => {
  //   this.props
  // }
  render() {
    return <div className="ui cards">
      <Pet  />
    </div>
  }
}

export default PetBrowser
