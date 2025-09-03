import { useEffect, useState } from 'react';
import './styles/Leaderboard.css';

export default function Leaderboard({leagueId}){
    const [scores, setScores] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch_scores();
    }, []);


    const fetch_scores = async () => {
        console.log(leagueId)
        try{
            const response = await fetch(`http://127.0.0.1:5000/api/leaderboard/${leagueId}`);
            const data = await response.json();
        
            if (data.success){
                setScores(data.scores);
                setLoading(false);
            }
            else if (!data.success){
                setError(data.error)
            }
        }
        catch (error) {
            setError(error.message);
            setLoading(false);
		}   
    }

    const sortedScores = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]); // Sort descending by score

    if (loading) return <div className="leaderboard">Loading...</div>;
    if (error) return <div className="leaderboard error">Error: {error}</div>;

    return (
        <div className="leaderboard">
        <h2>🏆 UFC Fantasy Leaderboard</h2>
        <ul>
            {sortedScores.map(([username, score], index) => (
            <li key={username} className={index === 0 ? 'first-place' : ''}>
                <span className="rank">#{index + 1}</span>
                <span className="username">{username}</span>
                <span className="score">{score} pts</span>
            </li>
            ))}
        </ul>
        </div>
    );
};


