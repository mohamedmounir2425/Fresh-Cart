import { JwtPayload } from 'jwt-decode';

export interface CustomJWTdecode extends JwtPayload {
  name: string;
}
