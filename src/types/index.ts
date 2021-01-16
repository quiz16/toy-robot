
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
}
