import React from "react"
import PropTypes from "prop-types"
import Tile from './Tile';

class Line extends React.Component {

  constructor (props){
    super(props);
  }

  render () {
    const tiles = this.props.tiles.map((t, index) => <Tile tile={t} key={index} />);
    return (
      <div>
        {tiles}
      </div>
    );
  }
}

Line.propTypes = {
};
export default Line
