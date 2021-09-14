export type UserCookie = {
  "access-token"?: string;
  client?: string;
  uid?: string;
};

export type Friend = {
  id: number;
  user_id: string;
  name: string;
};

export type Group = {
  id: number;
  name: string;
  members: [
    {
      id: number;
      name: string;
    }
  ];
};

export type Member = {
  id: number;
  name: string;
};

export type Event = {
  id: number;
  title: string;
  description: string;
};

export type Expence = {
  id: number;
  title: string;
  description: string;
  price: number;
  event_id: number;
  user_id: number;
  user_name: string;
};

export type Debt = {
  id: number;
  price: number;
  from_id: number;
  to_id: number;
  expence_id: number;
  event_id: number;
  group_id: number;
};

export type CalcArray = {
  debtPrice: number;
  userId: number;
  userName: string;
};
