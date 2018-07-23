import React from "react"
import PropTypes from "prop-types"

class Tile extends React.Component {

  constructor (props){
    super(props);
  }

  render () {
    const view = this.getView(this.props.tile);
    return (
      <span>
        {view}
      </span>
    );
  }

  getView (tile) {
    if (tile === 'e') return '⬜️';
    if (tile === 'p') return '👶';
    if (tile === 'b') return '🐶';
    if (tile === 'r') return '⬛️';
  }
}

Tile.propTypes = {
};
export default Tile
