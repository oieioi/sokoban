import React from "react"
import PropTypes from "prop-types"

class Question extends React.Component {
  render () {
    return (
      <React.Fragment>
        id: {this.props.id},
        name: {this.props.name},
        map: {this.props.map}
      </React.Fragment>
    );
  }
}

Question.propTypes = {
  id: PropTypes.string,
  map: PropTypes.string
};
export default Question
