export class API {
  constructor(private domain: string) { }

  get signUpAddress() {
    return this.domain + '/api/users';
  }

  get fbSignInAddress() {
    return this.domain + '/api/auth/facebook';
  }

  get signInAddress() {
    return this.domain + '/api/token';
  }

  get sportObjectsAddress() {
    return this.domain + '/api/sport_objects';
  }

  get sportComplexesAddress() {
    return this.domain + '/api/sport_complexes';
  }

  get newSportComplexAddress() {
    return this.domain + '/api/sport_complexes';
  }
}
