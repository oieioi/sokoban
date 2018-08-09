import React from "react"
import PropTypes from "prop-types"
import Line from "./Line"
import Player from "./Player"
import MapModel from '../models/Map'

class Map extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      map: new MapModel({map: props.map})
    }
  }

  render () {
    const lines = this.state.map.toArray().map((tiles, index) => <Line tiles={tiles} key={index} />);
    return (
      <section>
        <div>
          {lines}
        </div>
        <div className="controller">
          <button onClick={this.up.bind(this)}>up↑</button>
          <button onClick={this.down}>donw↓</button>
          <button onClick={this.right}>right→</button>
          <button onClick={this.left}>left←</button>
        </div>
      </section>
    );
  }


  up(){
    this.setState({map: this.state.map.up()});
  }
  donw(){ alert('k') }
  right(){ alert('l') }
  left(){ alert('h') }
}

Map.propTypes = {
  map: PropTypes.string
};

export default Map
