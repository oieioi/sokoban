import React from "react"
import PropTypes from "prop-types"
import TILES from '../const/TileConst'

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
    switch(tile) {
      case TILES.BOX: return '📦';
      case TILES.EMPTY: return '⬜️';
      case TILES.PLAYER: return '🤔';
      case TILES.RIGHT_PLACE: return '✨';
      case TILES.WALL: return '⬛️';
      default: throw new Error('bad tile:' + tile);
    }
  }
}

Tile.propTypes = {
};
export default Tile
