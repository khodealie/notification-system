import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ChannelKey } from '../enums/channel-key.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({ enum: ChannelKey })
  @IsEnum(ChannelKey)
  channel: ChannelKey;

  @ApiProperty()
  @IsString()
  recipient: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({
    description:
      'The content of the notification. Must match the expected schema for the channel.',
    type: 'object',
    additionalProperties: true,
  })
  @IsObject()
  content!: unknown;
}
