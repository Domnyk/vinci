export enum ERROR {
  /**
   * Returned when geocoder couldn't geocode provided address
   */
  NO_SUCH_ADDRESS = 'NO_SUCH_ADDRESS',
  /**
   * Returned when email has been taken
   */
  EMAIL_TAKEN = 'EMAIL_TAKEN',
  PAYPAL_EMAIL_TAKEN = 'PAYPAL_EMAIL_TAKEN',
  COMPLEX_STILL_HAS_OBJECTS = 'COMPLEX_STILL_HAS_OBJECTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  DEFAULT = 'DEFAULT'
}
