import { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';

const categories = [
  '🥳 Celebración',
  '🏠 Casa',
  '🌍 Viaje',
  '😍 Pareja',
  '🛠 Proyecto'
];

export default function CategorySelector({
  onChange,
  selected: initialSelected
}) {
  const [selected, setSelected] = useState(
    categories.includes(initialSelected) ? initialSelected : null
  );

  useEffect(() => {
    if (selected && selected !== initialSelected) onChange(selected);
  }, [initialSelected, selected, onChange]);

  const selectCategory = (category) => setSelected(category);

  return (
    <div className="flex flex-col gap-2">
      <label className="select-none">Categoria</label>
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
