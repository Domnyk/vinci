import { FlashMessageStatus } from './flash-message-status';

export interface FlashMessage {
  content: string;
  status: FlashMessageStatus;
}
