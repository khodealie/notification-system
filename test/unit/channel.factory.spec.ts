import { EmailChannel } from '../../src/modules/channel/channels/email.channel';
import { SmsChannel } from '../../src/modules/channel/channels/sms.channel';
import { PushChannel } from '../../src/modules/channel/channels/push.channel';
import { ChannelFactory } from '../../src/modules/channel/channel.factory';
import { ChannelKey } from '../../src/shared/enums/channel-key.enum';

describe('ChannelFactory', () => {
  const email = {} as EmailChannel;
  const sms = {} as SmsChannel;
  const push = {} as PushChannel;
  const factory = new ChannelFactory(email, sms, push);

  it('should resolve EMAIL', () => {
    expect(factory.resolve(ChannelKey.EMAIL)).toBe(email);
  });

  it('should resolve SMS', () => {
    expect(factory.resolve(ChannelKey.SMS)).toBe(sms);
  });

  it('should throw on unknown channel', () => {
    expect(() => factory.resolve('UNKNOWN' as any)).toThrow();
  });
});
