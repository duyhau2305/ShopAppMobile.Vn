export interface NotificationParams {
  id: number;
  is_read: boolean;
  message: string;
  title: string;
  hour: string;
  date: string;
  data: {
    type_display: number;
    description: string;
    file: string;
    has_attachments: boolean;
    name_file: string;
    image: string;
    title: string;
    name?: string;
    type: number;
    status: number;
    date?: string;
    is_approve?: number;
  };
}
