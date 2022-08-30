import { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';

const categories = [
  '🥳 Celebración',
  '🏠 Casa',
  '🌍 Viaje',
  '😍 Pareja',
  '🛠 Proyecto',
];

export default function CategorySelector({
  onChange,
  selected: initialSelected,
}) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) onChange(selected);
  }, [selected, onChange]);

  useEffect(() => {
    const initialSelectedExists = categories.includes(initialSelected);
    if (initialSelected && initialSelectedExists) {
      setSelected(initialSelected);
    }
  }, []); // eslint-disable-line

  const selectCategory = (category) => setSelected(category);

  return (
    <div>
      <label className="select-none">Categorias</label>
      <div>
        {categories.map((category) => (
          <CategoryItem
            key={category}
            category={category}
            selected={category === selected}
            selectCategory={selectCategory}
          />
        ))}
      </div>
    </div>
  );
}
