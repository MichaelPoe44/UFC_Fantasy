



const FighterCard = ({ fighter, weightclass,  selectable = false, selected = false, onSelect }) => {
  return (
    <div
      className={`fighter-card ${selectable ? 'selectable' : ''} ${selected ? 'selected' : ''}`}
      onClick={() => selectable && onSelect && onSelect(fighter.id)}
    >
      <h4>{fighter} : {weightclass}</h4>
      <br></br>
    </div>
  );
};

export default FighterCard;