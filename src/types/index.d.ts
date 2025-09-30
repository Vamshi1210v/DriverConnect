export interface User {
    id: string;
    name: string;
    avatar: string;
  }
  
  export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    created_at: string;
  }
  
  export interface Call {
    id: string;
    caller_id: string;
    receiver_id: string;
    type: 'video' | 'voice';
    sdp?: string;
    candidate?: any;
    status: 'pending' | 'accepted' | 'ended';
  }
  