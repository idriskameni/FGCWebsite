export interface PositionsData {
    id: string;
    lat: number;
    lon: number;
    route_id: string;
    timestamp: string;
}

export interface LinesData {
  coordinates: [number, number][];
  route_color: string;
  route_id: string;
}