import React, {useState, ChangeEvent } from 'react';
import Constants from 'constants/index';
import { CommandProps } from 'types';
import './styles.css';

const Command = ({
	assignCommand
}: CommandProps) => {
	const [value, setValue] = useState('');

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value.toUpperCase())

	const commandListRender = (command: string) => (
		<span key={command} className="command-item"><strong>{command}</strong></span>
	)

	const handleSubmit = () => {
		assignCommand(value);
		setValue('');
	}

	return (
		<div className="command-wrapper">
			<div className="input-wrapper">
				<input
					value={value}
					type="text"
					onChange={onChange}
					placeholder="Enter command..."
				/>
				<button type="submit" onClick={handleSubmit}>Run</button>
			</div>
			<div className="command-list">
				<span><strong>Commands:</strong></span>
				{Constants.COMMANDS.map(commandListRender)}
			</div>
			<div id="report-logs"/>
		</div>
	);
};

export default Command;

