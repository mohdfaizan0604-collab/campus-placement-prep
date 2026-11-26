export function ScoreChart({ points }: { points: { label: string; value: number }[] }) {
  if (points.length === 0) {
    return <p className="text-sm text-slate-600 dark:text-slate-300">Scores will show up here after a quiz or interview.</p>;
  }

  const width = 640;
  const height = 220;
  const padding = 28;
  const gap = 12;
  const barWidth = (width - padding * 2 - gap * (points.length - 1)) / points.length;

  return (
    <figure>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Recent scores out of 100">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="stroke-slate-300 dark:stroke-slate-700" />
        {points.map((point, index) => {
          const barHeight = Math.max(4, (Math.min(100, point.value) / 100) * (height - padding * 2));
          const x = padding + index * (barWidth + gap);
          const y = height - padding - barHeight;
          return (
            <g key={`${point.label}-${index}`}>
              <rect x={x} y={y} width={barWidth} height={barHeight} rx="6" className="fill-indigo-600" />
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" className="fill-slate-600 text-[12px] dark:fill-slate-300">
                {Math.round(point.value)}
              </text>
              <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" className="fill-slate-500 text-[11px]">
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>Recent scores out of 100</caption>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={`${point.label}-${index}`}>
              <td>{point.label}</td>
              <td>{Math.round(point.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
