import React, { useState } from 'react';
import { getStateContext } from '../StateProvider';
function GetStarted() {
	const {state, dispatch} = getStateContext()

  	const handleClick = () => {
		const newstate = {
			"user":{
				"user_id": 14,
				"username": "Tom"
			},
			"leagues":{
				8: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				9: {
					"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					},
					"league_participants": {
						2: {
							"team": {
								"name": "Team Name",
								"Bantamweight": {
									1: "Sean O'Malley",
									2: "Cory Sandhagen"
								},
								"Featherweight": {
									1: "Alexander Volkanovski",
									2: "Yair Rodríguez"
								},
								"Flyweight": {
									1: "Brandon Moreno",
									2: "Tatsuro Taira"
								},
								"Heavyweight": {
									1: "Ciryl Gane",
									2: "Alexander Volkov"
								},
								"Light Heavyweight": {
									1: "Alex Pereira",
									2: "Jiri Procházka"
								},
								"Lightweight": {
									1: "Arman Tsarukyan",
									2: "Dustin Poirier"
								},
								"Middleweight": {
									1: "Khamzat Chimaev",
									2: "Sean Strickland"
								},
								"Welterweight": {
									1: "Khamzat Chimaev",
									2: "Belal Muhammad"
								}
							},
							"username": "mike"			
						},
						14: {
							"team": {
								"name": "Team Name",
								"Bantamweight": {
									1: "Sean O'Malley",
									2: "Cory Sandhagen"
								},
								"Featherweight": {
									1: "Alexander Volkanovski",
									2: "Yair Rodríguez"
								},
								"Flyweight": {
									1: "Brandon Moreno",
									2: "Tatsuro Taira"
								},
								"Heavyweight": {
									1: "Ciryl Gane",
									2: "Alexander Volkov"
								},
								"Light Heavyweight": {
									1: "Alex Pereira",
									2: "Jiri Procházka"
								},
								"Lightweight": {
									1: "Arman Tsarukyan",
									2: "Dustin Poirier"
								},
								"Middleweight": {
									1: "Khamzat Chimaev",
									2: "Sean Strickland"
								},
								"Welterweight": {
									1: "Khamzat Chimaev",
									2: "Belal Muhammad"
								}
							},
							"username": "Tom"			
						},
						18: {
							"team": {
								"name": "Team Name",
								"Bantamweight": {
									1: "Sean O'Malley",
									2: "Cory Sandhagen"
								},
								"Featherweight": {
									1: "Alexander Volkanovski",
									2: "Yair Rodríguez"
								},
								"Flyweight": {
									1: "Brandon Moreno",
									2: "Tatsuro Taira"
								},
								"Heavyweight": {
									1: "Ciryl Gane",
									2: "Alexander Volkov"
								},
								"Light Heavyweight": {
									1: "Alex Pereira",
									2: "Jiri Procházka"
								},
								"Lightweight": {
									1: "Arman Tsarukyan",
									2: "Dustin Poirier"
								},
								"Middleweight": {
									1: "Khamzat Chimaev",
									2: "Sean Strickland"
								},
								"Welterweight": {
									1: "Khamzat Chimaev",
									2: "Belal Muhammad"
								}
							},
							"username": "call"			
						}	
					}
				},
				10: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				11: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				12: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				13: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				14: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				15: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				16: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}},
				17: {"league_info": {
						"admin_id": 14,
						"join_code": "7BtqsL",
						"name": "poop",
						"num_participants": 3,
					}}
			},
			"matchups_payload": {'success': true, 'payload': {5: {'user_info': {18: {'Flyweight': {None: 'pending'}, 'Bantamweight': {None: 'pending'}, 'Featherweight': {None: 'pending'}, 'Lightweight': {None: 'pending'}, 'Welterweight': {None: 'pending'}, 'Middleweight': {None: 'pending'}, 'Light Heavyweight': {None: 'pending'}, 'Heavyweight': {None: 'pending'}}, 14: {'Flyweight': {None: 'pending'}, 'Bantamweight': {None: 'pending'}, 'Featherweight': {None: 'pending'}, 'Lightweight': {None: 'pending'}, 'Welterweight': {None: 'pending'}, 'Middleweight': {None: 'pending'}, 'Light Heavyweight': {None: 'pending'}, 'Heavyweight': {None: 'pending'}}}, 'status': 'pending'}}}
  		}
		dispatch({
            type: "DEBUG",
            state: newstate
        })
		console.log(state)
	}
		
/* current_matchups payload\

{'success': True, 'payload': {5: {'user_info': {18: {'Flyweight': {None: 'pending'}, 'Bantamweight': {None: 'pending'}, 'Featherweight': {None: 'pending'}, 'Lightweight': {None: 'pending'}, 'Welterweight': {None: 'pending'}, 'Middleweight': {None: 'pending'}, 'Light Heavyweight': {None: 'pending'}, 'Heavyweight': {None: 'pending'}}, 14: {'Flyweight': {None: 'pending'}, 'Bantamweight': {None: 'pending'}, 'Featherweight': {None: 'pending'}, 'Lightweight': {None: 'pending'}, 'Welterweight': {None: 'pending'}, 'Middleweight': {None: 'pending'}, 'Light Heavyweight': {None: 'pending'}, 'Heavyweight': {None: 'pending'}}}, 'status': 'pending'}}}
*/


  	return (
    	<div>
      		<button onClick={handleClick}>debug</button>
    	</div>
		/*
		<div style={{ padding: '20px' }}>
		<h1>Input Revealer</h1>

		<button onClick={() => setShowInput1(true)}>Show Input 1</button>
		{showInput1 && (
			<div>
			<input type="text" placeholder="Enter something for Input 1" />
			</div>
		)}

		<button onClick={() => setShowInput2(true)} style={{ marginLeft: '10px' }}>
			Show Input 2
		</button>
		{showInput2 && (
			<div>
			<input type="text" placeholder="Enter something for Input 2" />
			</div>
		)}
		</div>
		*/
  	);
}

export default GetStarted;


