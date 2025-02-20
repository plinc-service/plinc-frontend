export interface PlincDetails {
  id: number;
  service: {
    description: string;
    name: string;
    category: string;
    hour_price: number;
    created_at: string;
  };
  date: string;
  address: string;
  client: {
    name: string;
    email: string;
    image: string | "/avatar.svg";
  };
  provider: {
    name: string;
    email: string;
    image: string | "/avatar.svg";
  };
}
