import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ChannelKey } from '../enums/channel-key.enum';

export class SendNotificationDto {
  @IsEnum(ChannelKey)
  channel: ChannelKey;

  @IsString()
  recipient: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsObject()
  content!: unknown;
}
