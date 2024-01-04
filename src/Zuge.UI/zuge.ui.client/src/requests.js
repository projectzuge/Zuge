export const extractUniqueStations = (data) => {
  const uniqueStations = data.reduce((stations, obj) => {
    obj.Stops.forEach((stop) => {
      stations.add(stop.Station);
    });
    return stations;
  }, new Set());

  return [...uniqueStations];
};
