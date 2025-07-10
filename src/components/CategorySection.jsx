import CategoryStatCard from './CategoryStatCard';

const colorMap = [
  'border-blue-500',
  'border-red-500',
  'border-yellow-500',
  'border-green-500',
  'border-pink-500',
  'border-purple-500',
  'border-orange-500',
  'border-cyan-500',
  'border-fuchsia-500',
  'border-amber-500',
  'border-lime-500',
];

export default function CategorySection({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((item, idx) => (
        <CategoryStatCard key={item.category} {...item} color={colorMap[idx % colorMap.length]} />
      ))}
    </div>
  );
}
