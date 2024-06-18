export interface categoryIF {
  id: number;
  name: string;
  color: string;
}
export interface ColorChoice {
  value: string;
  display_name: string;
}

export interface NoteIF {
  id: number;
  title: string;
  body: string;
  category: number | null;
}
export interface UserIF {
  id: number | null;
  username: string;
  password: string;
}
