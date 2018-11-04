export interface DTO {
  /**
   * This method should be called when Typescript show is meant to be send to API. Here all differences in show structure should be
   * changed in favour of API so it can be safely send.
   *
   * @returns {Object} Object with proper structure
   */
   dto: () => Object;
}
