import React from 'react';
import {connect} from 'react-redux';

import SpectrophotometerChart from './spectrophotometer_chart';

import {getFilter} from '../actions.js';

import '../embed.css';

var throttle = (type, name, obj) => {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) {
      return;
    }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

throttle('resize', 'optimizedResize');

function mapStateToProps({filtersById}, {match}) {
  return {
    filter: filtersById[Object.keys(filtersById)[0]] || {},
  };
}

class Embed extends React.Component {
  constructor(props) {
    super(props);

    props.getFilter(props.match.params.name);

    window.addEventListener('optimizedResize', () => this.forceUpdate());

    document.body.classList.add('embedded');
  }

  render() {
    const {filter} = this.props;
    return (
      <div style={{overflow: 'hidden'}}>
        <SpectrophotometerChart
          embedded
          data={filter.spectrophotometerData}
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, {getFilter})(Embed);
