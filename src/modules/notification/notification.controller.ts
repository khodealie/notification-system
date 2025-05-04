import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from '../../shared/dtos/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly svc: NotificationService) {}

  @Post()
  queue(@Body() dto: SendNotificationDto) {
    return this.svc.send(dto);
  }

  @Post('immediate')
  immediate(@Body() dto: SendNotificationDto) {
    return this.svc.sendImmediate(dto);
  }

  @Get(':id')
  status(@Param('id') id: string) {
    return this.svc.findById(id);
  }
}
