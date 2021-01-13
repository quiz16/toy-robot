import React from 'react';
import Constants from 'constants/index';
import './styles.css';

const Table = () => {
	const renderCol = (x: number, y: number) => {
		const data = [];
		let countCol = 0;
		while(countCol < y) {
			data.push(
				<div id={`${x}-${countCol}`} className="row-item">
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
				<div className="row">
					{renderCol(countRow, y)}
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

