



export default function TeamDisplay({participantEntries}){



    return(
        <div className="participants-section">
			<h2>Participants & Teams</h2>
			{participantEntries.map(([userId, { team, username }]) => (
				<div key={userId} className="participant">
					<h3>Team: {team.name}</h3>
					<p>Coach: {username} ({userId})</p>
					<div className="team-details">
						{Object.entries(team)
							.filter(([key]) => key !== "name") // ignore team name when displaying weight classes
							.map(([weightClass, fighterObj]) => (
							<div key={weightClass} className="weight-class">
								<strong>{weightClass}:</strong> {Object.values(fighterObj).join(', ')}
							</div>
							))}
						</div>
					</div>
				))}
		</div>

    )
}