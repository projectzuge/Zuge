export const extractUniqueStations = (data) => {
  const uniqueStations = [];

  data.forEach((obj) => {
    if (Array.isArray(obj.stops)) {
      obj.stops.forEach((stop) => {
        if (stop && stop.station) {
          const station = stop.station;
          if (!uniqueStations.includes(station)) {
            uniqueStations.push(station);
          }
        }
      });
    }
  });

  return uniqueStations;
};
