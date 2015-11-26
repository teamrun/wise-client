import React, { PropTypes } from 'react'

const FixedTip = React.createClass({
  render () {
    return (
      <div className="fixed-tip">
        {this.props.children}
      </div>
    )
  }
});

export default FixedTip;
