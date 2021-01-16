import { TableDimension } from 'types';

const TABLE_DIMENSION: TableDimension = {
  x: 5,
  y: 5
};

export default {
	COMMANDS: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
	DIRECTIONS: ['NORTH', 'EAST', 'SOUTH', 'WEST'],
	TABLE_DIMENSION,
}
