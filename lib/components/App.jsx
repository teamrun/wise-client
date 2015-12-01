import React, { PropTypes } from 'react';

import Dashboard from './Dashboard';

const App = React.createClass({
  render () {
    return (
      <div className="wise-app">
        <Dashboard {...this.props} />
      </div>
    )
  }
});

export default App
