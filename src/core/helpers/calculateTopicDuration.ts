export const calculateTopicDuration = (startTime: string, endTime: string) =>
  `${Math.abs(+startTime.slice(0, 2) - +endTime.slice(0, 2))}`;
