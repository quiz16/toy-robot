import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Constants from 'constants/index';
import Table from 'components/table';
import Command from 'components/command';

function App() {
	const [commandValue, setCommandValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const resetCommand = () => setCommandValue('');
	const checkCommand = (command: string) => {
		let res = false;
		const [firstCommand] = command.split(' ');
		return Constants.COMMANDS.indexOf(firstCommand) > -1;
	}
	const assignCommand = (command: string) => {
		if (checkCommand(command)) {
			setCommandValue(command);
		} else {
			setErrorMessage('Invalid command!');
		}
	}
  return (
    <div className="App">
			<Table
				commandValue={commandValue}
				resetCommand={resetCommand}
			/>
			<Command assignCommand={assignCommand} />
    </div>
  );
}

export default App;
