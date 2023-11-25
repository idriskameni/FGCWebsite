export interface PositionsEntry {
  desti: string;
  dir: string;
  en_hora: string;
  estacionat_a: string;
  geo_point_2d: {
    lat: number;
    lon: number;
  };
  id: string;
  lin: string;
  ocupacio_m1_percent: number;
  ocupacio_m1_tram: number;
  ocupacio_m2_percent: number;
  ocupacio_m2_tram: number;
  ocupacio_mi_percent: number;
  ocupacio_mi_tram: number;
  ocupacio_ri_percent: number;
  ocupacio_ri_tram: number;
  origen: string;
  properes_parades: string;
  timestamp: number;
  tipus_unitat: string;
  ut: string;
}

export interface RouteEntry {
  geo_point_2d: {
      lat: number;
      lon: number;
  };
  route_color: string;
  route_id: string;
  route_long_name: string;
  route_short_name: string;
  route_type: string;
  route_url: string;
  shape: {
      geometry: {
          coordinates: number[][][];
          type: string;
      };
      properties: Record<string, unknown>;
      type: string;
  };
}