/**
 * Statistics component
 * @author wilpola
 */

// Interface
interface IStatistics {
  text: string;
  value: string | number;
}

export default function Statistics({ reviews, statistics }: any) {
  /// ...
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={reviews?.good} />
        <StatisticLine text="neutral" value={reviews.neutral} />
        <StatisticLine text="bad" value={reviews.bad} />
        <StatisticLine text="all" value={statistics.total} />
        <StatisticLine
          text="average"
          value={(Math.ceil(statistics.average * 100) / 100).toFixed(2)}
        />
        <StatisticLine
          text="positive"
          value={`${((statistics.positive * 100) / 100).toFixed(2)}%`}
        />
      </tbody>
    </table>
  );
}

const StatisticLine = ({ text, value }: IStatistics) => {
  return (
    <tr>
      <td>
        {text.length > 1
          ? text?.charAt(0).toUpperCase() + text?.slice(1)
          : text}
        :{" "}
      </td>
      <td className="text-center">{value}</td>
    </tr>
  );
};
