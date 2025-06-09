import "./TeamDisplay.css"

  
export default function TeamDisplay() {

  const team = [{id:1,name:"jon-jones",img:"https://ufc.com/images/styles/event_results_athlete_headshot/s3/2025-01/5/JONES_JON_BELT_11-16.png?itok=7-Y2NtLg",record:"28-1",division:"Heavyweight Division"},
    {id:2,name:"jon-jones",img:"https://ufc.com/images/styles/event_results_athlete_headshot/s3/2025-01/5/JONES_JON_BELT_11-16.png?itok=7-Y2NtLg",record:"28-1",division:"Heavyweight Division"}
  ]

  return (
    <div className="team-container">

        <h2>Your Fantasy Team</h2>

        <div className="fighter-list">

            {team.map((fighter) => (
            <div key={fighter.id} className="fighter-card">
                <img
                src={fighter.img}
                alt={fighter.name}
                className="fighter-image"
                />
                <div className="fighter-info">
                <h3>{fighter.name}</h3>
                <p>{fighter.division}</p>
                <p>
                    Record: {fighter.record}
                </p>
                </div>
            </div>
            ))}


        </div>
    </div>
  );
}




//jon-jones
//"https://ufc.com/images/styles/event_results_athlete_headshot/s3/2025-01/5/JONES_JON_BELT_11-16.png?itok=7-Y2NtLg"
//"28-1-0 (W-L-D)"

//