import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { Link } from 'react-router'

const ImageCell = ({rowIndex, data, col, ...props}) => (
  <img src={data[rowIndex][col]} height="100px" width="100px"
  />
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col].toLocaleString()}
  </Cell>
);

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <button onClick={props.getHero(data[rowIndex][col])}>More Info</button>
  </Cell>
);

export default class HeroList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dataList = this.props.heroes;
    return (<Table
      rowHeight={100}
      rowsCount={dataList.length}
      width={1000}
      height={5000}
      headerHeight={50}>
      <Column
        header={<Cell></Cell>}
        cell={<ImageCell data={dataList} col="s3ImageUrl" />}
        width={100}
      />
      <Column
        header={<Cell>Hero Name</Cell>}
        cell={<TextCell data={dataList} col="heroName" />}
        width={200}
      />
      <Column
        header={<Cell>Real Name</Cell>}
        cell={<TextCell data={dataList} col="realName" />}
        width={200}
      />
      <Column
        header={<Cell>Details</Cell>}
        cell={<LinkCell data={dataList} col="uuid" getHero={this.props.getHero}/>}
        width={200}
      />
    </Table>);
  }
}
