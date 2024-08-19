export interface ReceiverEmailOptions {
  email: string;
  user_id: string;
}

export interface INodemailerProvider {
  sendEmail(receiver: ReceiverEmailOptions, hash: string): Promise<void>;
}
