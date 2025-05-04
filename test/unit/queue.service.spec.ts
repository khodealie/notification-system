import { ChannelKey } from '../../src/shared/enums/channel-key.enum';
import { QueueService } from '../../src/queue/queue.service';
import { NotificationStatus } from '../../src/shared/enums/notification-status.enum';

describe('QueueService', () => {
  const notif = {
    id: 'abc-123',
    recipient: 'user@example.com',
    subject: 'Welcome',
    channel: ChannelKey.EMAIL,
    content: { template: 'hello' },
  };

  const mockRepo = {
    findLite: jest.fn().mockResolvedValue(notif),
    updateStatus: jest.fn(),
  };

  const mockChannel = {
    send: jest.fn().mockResolvedValue({ id: 'mock', raw: {} }),
  };

  const mockFactory = {
    resolve: jest.fn().mockReturnValue(mockChannel),
  };

  const mockDS = {
    transaction: jest
      .fn()
      .mockImplementation((fn) =>
        fn({ save: jest.fn(), increment: jest.fn() }),
      ),
  };

  const service = new QueueService(
    { add: jest.fn() } as any,
    mockRepo as any,
    mockFactory as any,
    mockDS as any,
  );

  it('should handle a notification and mark as sent', async () => {
    await service.handle('abc-123');

    expect(mockRepo.updateStatus).toHaveBeenCalledWith(
      'abc-123',
      NotificationStatus.RETRYING,
    );
    expect(mockChannel.send).toHaveBeenCalledWith(expect.anything());
  });
});
