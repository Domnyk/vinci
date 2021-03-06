import LatLngLiteral = google.maps.LatLngLiteral;

export interface SearchResponse {
  results: Array<{object_id: number, lowest_price: number, distance: number}>;
  params: {day: string, disciplines: number[], geo_location: LatLngLiteral};
}
