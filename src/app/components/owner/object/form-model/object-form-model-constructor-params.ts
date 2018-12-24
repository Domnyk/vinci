import LatLngLiteral = google.maps.LatLngLiteral;

interface ObjectFormModelConstructorParams {
  id?: number;
  complexId?: number;
  name?: string;
  bookingMarginInMonths?: number;
  bookingMarginInDays?: number;
  street?: string;
  buildingNumber?: string;
  postalCode?: string;
  city?: string;
  geoCoordinates?: LatLngLiteral
}
