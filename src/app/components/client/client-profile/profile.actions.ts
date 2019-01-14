import * as Profiles from '../../../models/client-profile';

export class UpdateClient {
  static readonly type = 'Update client';

  constructor(public clientProfile: Profiles.ClientProfile) {}
}
