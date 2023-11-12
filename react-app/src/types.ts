export interface PositionsData {
    id: string;
    lat: number;
    lon: number;
    timestamp: string;
}

export interface LinesData {
  coordinates: [number, number][];
  route_color: string;
  route_id: string;
}