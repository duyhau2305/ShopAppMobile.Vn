export interface CollaboratorParams {
  id: number;
  status: number;
  name: string;
  employee: {
    avatar: string;
    full_name: string;
    phone_number: string;
    address?: string;
    after_card_id: string;
    before_card_id: string;
    cccd: string;
    created_at: string;
    status: number;
    user_id: number;
  };
}
