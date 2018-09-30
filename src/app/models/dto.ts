export abstract class DTO {
  /**
   * This method should be called when Typescript object is meant to be send to API. Here all differences in object structure should be
   * changed in favour of API so it can be safely send.
   *
   * @returns {Object} Object with proper structure
   */
  abstract get dto(): Object;
}
