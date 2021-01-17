import React, { useState, useEffect } from 'react';
import Constants from 'constants/index';
import { TableProps, Coordinate, BoundType } from 'types';
import './styles.css';

const Table = ({
	commandValue,
	resetCommand,
	setErrorMessage,
	setReportLogs,
}: TableProps) => {
	const [direction, setDirection] = useState<string>('NORTH');
	const [coordinates, setCoordinates] = useState<string>('0-0');
	const [isValid, setIsValid] = useState<boolean>(false);

	const cleanOld = () => {
		const el = document.getElementById(coordinates)!;
		const childEl = el.getElementsByClassName('content')[0]!;

		childEl.classList.remove("active");
		childEl.classList.remove(direction);
	}

	const appendRobot = (id: string, currDirection: string) => {
		const el = document.getElementById(id)!;
		const childEl = el.getElementsByClassName('content')[0]!;

		childEl.classList.add("active");
		childEl.classList.remove(direction);
		childEl.classList.add(currDirection);
		if (id !== coordinates) {
			cleanOld();
		}
	};

	const outOfBounds = (x: number, y: number, type: keyof BoundType) => {
		const dimension: Coordinate = Constants.TABLE_DIMENSION;
		const boundType: BoundType = {
			UPDOWN: x >= dimension.x,
			SIDE: y >= dimension.y,
			PLACE: x >= dimension.x || y >= dimension.y
		}
		return boundType[type];
	}

	const execute = (value: string) => {
		const [command, params] = value.split(' ');
		const directionIndex = Constants.DIRECTIONS.indexOf(direction)
		const directionLen = Constants.DIRECTIONS.length
		if (command === 'PLACE') {
			const [x,y,dir] = params.split(',');
			if (outOfBounds(+x, +y, 'PLACE')) {
				return setErrorMessage('Robot will fall!');
			}

			if (Constants.DIRECTIONS.indexOf(dir) < 0) {
				return setErrorMessage('Invalid direction command!');
			}
			setIsValid(true);
			const id = `${x}-${y}`;
			setDirection(dir);
			setCoordinates(id)
			appendRobot(id, dir);
		}

		if (isValid) {
			const [coorX, coorY] = coordinates.split('-');
			switch(command) {
				case 'RIGHT':
					const indexIncrement = directionIndex + 1;
					const rightIndex = indexIncrement + 1 > directionLen ? 0 : indexIncrement;
					setDirection(Constants.DIRECTIONS[rightIndex])
					appendRobot(coordinates, Constants.DIRECTIONS[rightIndex]);
					break;
				case 'LEFT':
					const indexDecrement = directionIndex - 1;
					const leftIndex = indexDecrement < 0 ? directionLen + indexDecrement : indexDecrement;
					setDirection(Constants.DIRECTIONS[leftIndex])
					appendRobot(coordinates, Constants.DIRECTIONS[leftIndex]);
					break;
				case 'MOVE':
					let id = '';
					let boundType: keyof BoundType = 'UPDOWN';
					let nextCoor = 0;
					if (direction === 'NORTH' || direction === 'SOUTH') {
						nextCoor = direction === 'NORTH' ? +coorY + 1 : +coorY - 1;
						id = `${coorX}-${nextCoor}`;
					} else {
						nextCoor = direction === 'EAST' ? +coorX + 1 : +coorX - 1;
						id = `${nextCoor}-${coorY}`;
						boundType = 'SIDE';
					}
					if (outOfBounds(nextCoor, nextCoor, boundType)) {
						return setErrorMessage('Robot will fall!');
					}
					setCoordinates(id)
					appendRobot(id, direction);
					break;
				case 'REPORT':
					return setReportLogs(`REPORT: ${coorX},${coorY},${direction}`);
				default:
					console.log('default!');
				break;
			}
		}
		resetCommand();
	}

	useEffect(() => {
		if (commandValue) {
			execute(commandValue);
		}
	}, [commandValue]);

	const renderCol = (x: number, y: number, total: number) => {
		const data = [];
		let countCol = 0;
		while(countCol < y) {
			const key = `${countCol}-${total - x - 1}`;
			data.push(
				<div key={key} id={key} className="row-item">
					<div className="content"/>
				</div>
			);
			countCol += 1;
		}
		return data;
	}
	const renderRow = () => {
		const {x, y} = Constants.TABLE_DIMENSION;
		const data = [];
		let countRow = 0;
		while(countRow < x) {
			data.push(
				<div key={countRow} className="row">
					{renderCol(countRow, y, x)}
				</div>
			);
			countRow += 1;
		}
		return data;
	}
	return (
		<div className="table-wrapper">
			{renderRow()}
		</div>
	);
};

export default Table;

