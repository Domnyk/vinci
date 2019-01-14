import { OwnerProfile } from '../../../models/owner-profile';

export class UpdateOwner {
  static readonly type = 'Update owner profile';

  constructor(public ownerProfile: OwnerProfile) {}
}
