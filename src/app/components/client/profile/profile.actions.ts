import * as Profiles from '../../../models/profile';

export class UpdateClient {
  static readonly type = 'Update client';

  constructor(public clientProfile: Profiles.ClientProfile) {}
}
