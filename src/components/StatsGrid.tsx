export const StatsGrid = ({ stats }: { stats: { name: string; value: string }[] }) => (
  <ul className="fk-dash__stats">
    {stats.map((stat, i) => (
      <li key={i} className="fk-dash__stat">
        <span className="fk-dash__stat-name">{stat.name}</span>
        <span className="fk-dash__stat-value">{stat.value}</span>
      </li>
    ))}
  </ul>
)
