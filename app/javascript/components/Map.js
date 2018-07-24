import React from "react"
import PropTypes from "prop-types"
import Line from "./Line"
import Player from "./Player"
import TILES from "../const/TileConst"

class Map extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      map: [],
    }
  }

  componentDidMount() {
    const map = this.toArray(this.props.map);
    this.setState(Object.assign(this.state, {map}));
  }

  render () {
    const lines = this.state.map.map( tiles => <Line tiles={tiles} />);
    return (
      <div>
        {lines}
      </div>
    );
  }

  /**
   * @param {Stirng} mapString raw map
   */
  toArray (mapString) {
    const ary = [];
    let lineCount = 0;
    mapString.split('').forEach(s => {
      if (s === TILES.NEW_LINE) {
        lineCount++;
        return;
      }
      if (ary[lineCount] == null) {
        ary[lineCount] = [];
      }
      ary[lineCount].push(s);
    });
    return ary;
  }
}

Map.propTypes = {
  map: PropTypes.string
};

export default Map
