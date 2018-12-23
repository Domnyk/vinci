export interface Validator {
  /**
   * Return true when form model object is valid
   *
   * This method should iterate over all formControls to check whether or not they are valid
   */
  isValid: () => boolean;
}
