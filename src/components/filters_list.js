import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { Button, Intent } from '@blueprintjs/core';

import Filter from './filter';
import { createFilter } from '../actions';

function mapStateToProps(state) {
  return {
    filters: Object.keys(state.filtersById)
      .map(x => state.filtersById[x])
      .sort((a, b) => a.name > b.name),
  };
}

function mapDispatchToProps(dispatch, { history }) {
  return {
    handleAddFilter: () => {
      dispatch(createFilter())
        .then(id => history.replace(`/filters/${id}`));
    },
  };
}

function FiltersList({ filters = [], match, handleAddFilter }) {
  return (
    <article style={{ marginTop: '2em' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>Filter Specifications</h4>
        <Button
          intent={Intent.SUCCESS}
          iconName="add"
          text="New Filter"
          onClick={handleAddFilter}
        />
      </div>
      <table className="pt-table pt-interactive" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>CE</th>
            <th>VLT</th>
            <th>Price</th>
            <th>OD Ranges</th>
            <th>L-Ratings</th>
          </tr>
        </thead>
        <tbody>
          {filters.map(filter => <FiltersListEntry key={filter.name} {...filter} />)}
        </tbody>
      </table>

      <Route path={`${match.url}/:filterId`} component={Filter} />
    </article>
  );
}

FiltersList.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  handleAddFilter: PropTypes.func.isRequired,
};

FiltersList.defaultProps = {
  filters: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersList);


function FiltersListEntry({ id, name, ce, vlt, color, basePrice, ods, lRatings }){
  return (
    <Route>
      {({ history, match }) =>
        <tr onClick={() => history.replace(`${match.url}/${id}`)}>
          <td><span className="pt-tag pt-minimal">{name || '—'}</span></td>
          <td>{ce ? 'Certified' : 'Pending'}</td>
          <td>{`${vlt || '—'}% ${color || '—'}`}</td>
          <td>{`$${parseFloat(basePrice) % 1 ? parseFloat(basePrice).toFixed(2) : parseInt(basePrice, 10) || '—'}`}</td>
          <td><RangeList items={ods} /></td>
          <td><RangeList items={lRatings} /></td>
        </tr>}
    </Route>
  );
}

const RangeList = ({ items = [] }) => <p style={{ maxWidth: '30em', margin: 0 }} className="pt-text-overflow-ellipsis">
  {items.map((item, i) => <span key={i}>
    {i === 0 ? '' : <span className="pt-text-muted"> | </span>}
    {item.range} <strong>{item.value}</strong>
  </span>)
    }
</p>;

RangeList.propTypes = {
  items: React.PropTypes.array,
};
