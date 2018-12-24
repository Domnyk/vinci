export interface JoinEventResponse {
  event_id: number;
  user_id: number;
  is_event_owner: boolean;
  has_paid: boolean;
}
