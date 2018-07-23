import React from "react"
import PropTypes from "prop-types"
import Map from "./Map"

class Question extends React.Component {
  render () {
    return (
      <React.Fragment>
        id: {this.props.id},
        name: {this.props.name},
        <Map
          map={this.props.map} />
      </React.Fragment>
    );
  }
}

Question.propTypes = {
  id: PropTypes.number,
  map: PropTypes.string
};
export default Question
