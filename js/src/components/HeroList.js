import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { Link } from 'react-router'
import { HeroURI, defaultHero } from '../config/settings'

const ImageCell = ({rowIndex, data, col, ...props}) => (
  <img src={data.getObjectAt(rowIndex)[col]} height="100px" width="100px"
  />
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col].toLocaleString()}
  </Cell>
);

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <Link to={`/hero/${data.getObjectAt(rowIndex)[col]}`}>More Info</Link>
  </Cell>
);

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    var {sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
    this.getSize = this.getSize.bind(this);
    this.getObjectAt = this.getObjectAt.bind(this);
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    if (typeof this._data === 'array') {
      return this._data.getObjectAt(this._indexMap[index])
    }
    else {
      return this._data[this._indexMap[index]];
    }

  }
}

export default class HeroList extends React.Component {
  constructor(props) {
    super(props);

    this._dataList = this.props.heroes;
   
    this._defaultFilterIndexes = [];
    var size = this._dataList.length;
    for (var index = 0; index < size; index++) {
      this._defaultFilterIndexes.push(index);
    }
    this._filteredDataList = new DataListWrapper(this._defaultFilterIndexes, this._dataList)

    this._defaultSortIndexes = [];
    var size = this._dataList.length;
    for (var index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    }

    this.state = {
      sortedDataList: new DataListWrapper(this._defaultSortIndexes, this._filteredDataList),
      colSortDirs: {},
    };

    this.GroupTitle = this.GroupTitle.bind(this);
    this.getState = this.getState.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        sortedDataList: new DataListWrapper(this._defaultSortIndexes, this._dataList)
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      if (this._dataList.getObjectAt(index).heroName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      sortedDataList: new DataListWrapper(this.state.sortedDataList._indexMap, new DataListWrapper(filteredIndexes, this._dataList)),
    });
  }


  _onSortChange(columnKey, sortDir) {
    var sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      var valueA = this._filteredDataList.getObjectAt(indexA)[columnKey];
      var valueB = this._filteredDataList.getObjectAt(indexB)[columnKey];
      var sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SortTypes.ASC) {
        sortVal = sortVal * -1;
      }

      return sortVal;
    });

    this.setState({
      sortedDataList: new DataListWrapper(sortIndexes, this._filteredDataList),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }

  GroupTitle(props) {
    if (props.groupid) {
      return <h1>These heroes are a part of {props.groupid}</h1>
    }
    return ""
  }

  getState(props) {
    return new DataListWrapper(this._defaultSortIndexes, props.heroes);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sortedDataList: this.getState(nextProps),
    });
  }

  render() {
    var {sortedDataList, colSortDirs} = this.state;
    return (<div className="container">
      <div className="row">
        {this.GroupTitle(this.props)}
      </div>
      <div className="row">
        <input
          onChange={this._onFilterChange}
          placeholder="Filter by Hero Name"
          className='pull-left'
        />
      </div>
      <div className="row">
        <Table
          rowHeight={100}
          rowsCount={sortedDataList.getSize()}
          width={700}
          height={500}
          headerHeight={50}>
          <Column
            header={<Cell></Cell>}
            cell={<ImageCell data={sortedDataList} col="s3ImageUrl" />}
            width={100}
          />
          <Column
            columnKey="heroName"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.heroName}>
                Hero Name
            </SortHeaderCell>
            }
            cell={<TextCell data={sortedDataList} col="heroName" />}
            width={200}
          />
          <Column
            columnKey="realName"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.realName}>
                Real Name
            </SortHeaderCell>
            }
            cell={<TextCell data={sortedDataList} col="realName" />}
            width={200}
          />
          <Column
            columnKey="uuid"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.uuid}>
                Details
            </SortHeaderCell>
            }
            cell={<LinkCell data={sortedDataList} col="uuid" />}
            width={200}
          />
        </Table>
      </div>
    </div >);
  }
}
