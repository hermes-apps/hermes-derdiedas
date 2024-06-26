import { React, useState } from "react";
import "./lobby.css";
import Button from "../components/button";
import PlayerList from "../components/lobby.playerlist";
import getUsername from "../utils/getusername";
import PopupName from "../components/popup.name";
import { Link } from "react-router-dom";

// Placeholder variable for playerList. This playerList is a frozen version of the state variable version, every time the latter changes it will have this as a reference of what it used to look like. Mainly using this so players can change their username
const fetchedPlayerList = [
	{
		placement: 3,
		name: "Lorenz",
		winPercentage: null,
		isOwner: true,
	},
	{
		placement: 2,
		name: "Super super long name aaaa",
		winPercentage: "90%",
		isOwner: false,
	},
	{
		placement: 1,
		name: "Jasmine",
		winPercentage: "60%",
		isOwner: false,
	},
];

/* 
The match Lobby should be where you see the player list and can click PARTIE STARTEN or SPIEL STARTEN (TBD) 
*/
const Lobby = (props) => {
	// Should be useState(getUsername(playerList)) but we're using a placeholder for testing purposes
	const [playerName, setUserName] = useState("Lorenz");
	const [showDialog, setShowDialog] = useState(false);
	const [playerList, setPlayerList] = useState(fetchedPlayerList);
	let oldPlayerName = playerName;

	const changeUserName = (newUserName) => {
		fetchedPlayerList.forEach((playerElement) => {
			if (playerElement.name === oldPlayerName) {
				fetchedPlayerList[fetchedPlayerList.indexOf(playerElement)].name =
					newUserName;
				oldPlayerName = newUserName;
				setUserName(newUserName);
				setPlayerList(fetchedPlayerList);
			}
		});
	};
	return (
		<>
			<PopupName
				setUserName={changeUserName}
				showDialog={showDialog}
				setShowDialog={setShowDialog}
				originalName={oldPlayerName}
				playerList={playerList}
			/>
			<div className="room">
				<div className="playerlist">
					<PlayerList
						playerList={playerList}
						playerName={playerName}
						setShowDialog={setShowDialog}
					/>
				</div>
				{playerList.some((e) => e.name === playerName && e.isOwner) && (
					<div className="start-game">
						<Link to={`/4324`}>
							<Button>SPIEL STARTEN</Button>
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default Lobby;
