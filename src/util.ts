import { IAirport } from "./types"

export const calcDistance = (departing: IAirport, destination: IAirport) => {

  const lat1 = departing.latitude ?? 0
  const lat2 = destination.latitude ?? 0
  const lon1 = departing.longitude ?? 0
  const lon2 = destination.longitude ?? 0

  const radlat1: number = Math.PI * lat1 / 180;
  const radlat2: number = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  let distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  distance = Math.acos(distance);
  distance = distance * 180 / Math.PI;
  distance = distance * 60 * 1.1515;
  distance = Math.round(distance * 0.8684) || 0;

  return distance
}