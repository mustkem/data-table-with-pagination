export interface UserProps {
  id: string;
  name: string;
  email: string;
  username: string;
  website: string;
  phone: number;
  address: AddressInterface;
  company: CompanyInterface;
}

export interface AddressInterface {
  city: string;
}
export interface CompanyInterface {
  name: string;
}
export interface HomeProps {
  getList: () => void;
  userList: Array<UserProps>;
}

export interface TableHeader {
  id: string;
  name: string;
  email: string;
  username: string;
  website: string;
  phone: string;
  city: string;
  company: string;
}

export interface TableProps {
  userList: Array<UserProps>;
  tableHeader: any;
  itemsPerPage: number;
}

export interface TableItemProps {
  item: UserProps;
}

export interface PaginationProps {
  page: number;
  handleChange: Function;
  totalItems: number;
  itemsPerPage: number;
}
