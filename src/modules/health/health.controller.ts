import { Controller, Get } from '@nestjs/common';
import { HealthResponseDto } from './dto/health.dto';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    const health = new HealthResponseDto();
    health.status = 'up';
    return health;
  }
}
