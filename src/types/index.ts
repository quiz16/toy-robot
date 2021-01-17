
export interface Coordinate {
	x: number;
	y: number;
}

export interface TableDimension extends Coordinate {}

export type CommandProps = {
	assignCommand: (command: string) => void;
}

export type TableProps = {
	commandValue: string;
	resetCommand: () => void;
	setErrorMessage: (msg: string) => void;
	setReportLogs: (msg: string) => void;
}

export type BoundType = {
	UPDOWN?: boolean;
	SIDE?: boolean;
	PLACE?: boolean;
}
