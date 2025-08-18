import FighterCard from './FighterCard';

const WeightClassPicker = ({ weightClass, fighters, onPick, selectedId }) => {
  return (
    <div className="weight-class-picker">
      <h4>{weightClass}</h4>
      <div className="fighter-options">
        {fighters.map(f => (
          <FighterCard
            key={f.id}
            fighter={f}
            selectable
            selected={selectedId === f.id}
            onSelect={() => onPick(weightClass, f.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WeightClassPicker;