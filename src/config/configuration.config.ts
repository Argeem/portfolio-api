import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  jwtToken: process.env.JWT_SECRET || 'your_jwt_secret',
}));
