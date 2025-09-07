import { channels } from "src/app/consts";

export interface UserInfo {
  id: string;
  // Account
  username: string;
  password: string;
  email: string;
  phone?: string;
  // User details
  firstname: string;
  lastname: string;
  country?: string;
  city?: string;
  address?: string;
  // Business details
  company?: string;
  business_email?: string,
  business_phone?: string,
  role?: string;
  // Social network
  facebook?: string,
  twitter?: string,
  instagram?: string,
  company_contact?: string,
  github?: string,

  notify?: boolean;
  com_channels?: channels[];
  skills?: string[];
}
