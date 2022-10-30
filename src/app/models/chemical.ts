export interface Chemical {
  name:        string;
  description: string;
  timeline:    string;
  items:       Item[];
  id:          number;
}

export interface Item {
  name:        string;
  description: string;
  qty:         number;
  chemicalId:  number;
}
