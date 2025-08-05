



export default function DraftBoard({ draftState }){

    if (!draftState?.draft_order) return null;


    return(
        <div className="draft_board">
            <h3>Draft Board</h3>
            
            <ul>
                {draftState.draft_order.map((userId, idx) => {
                    const userPicks = draftState.picks.filter(p => p.user_id === userId);
                    return (
                        <li key={idx}>
                            <strong>Player {userId}</strong>
                            <ul>
                                {userPicks.map(p => (
                                    <li key={p.fighter_id}>{p.fighter_name} ({p.weight_class})</li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>

        </div>
    )
}