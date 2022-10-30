export interface User {
  id:        number;
  firstName: string;
  lastName:  string;
  username:  string;
  password:  string;
  role:      Role;
}

export interface Role {
  id:   number;
  name: string;
}
