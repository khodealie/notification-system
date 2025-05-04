import { NotificationService } from '../../src/modules/notification/notification.service';
import { NotificationRepository } from '../../src/cores/notification-core/repositories/notification.repository';
import { QueueService } from '../../src/queue/queue.service';
import { NotificationStatus } from '../../src/shared/enums/notification-status.enum';
import { ChannelKey } from '../../src/shared/enums/channel-key.enum';

describe('NotificationService', () => {
  const mockRepo = {
    createAndSave: jest.fn().mockResolvedValue({ id: 'abc-123' }),
    findByIdWithAttempts: jest.fn().mockResolvedValue({ id: 'abc-123' }),
  };
  const mockQueue = {
    enqueue: jest.fn(),
    handle: jest.fn(),
  };

  const service = new NotificationService(
    mockRepo as any as NotificationRepository,
    mockQueue as any as QueueService,
  );

  it('should send (queue)', async () => {
    const res = await service.send({
      channel: ChannelKey.EMAIL,
      recipient: 'test@example.com',
      subject: 'Hi',
      content: { template: 'test' },
    });

    expect(mockRepo.createAndSave).toHaveBeenCalledWith(
      expect.anything(),
      NotificationStatus.PENDING,
    );
    expect(mockQueue.enqueue).toHaveBeenCalledWith('abc-123');
    expect(res.id).toBe('abc-123');
  });

  it('should send immediate', async () => {
    await service.sendImmediate({
      channel: ChannelKey.EMAIL,
      recipient: 'test@example.com',
      subject: 'Hi',
      content: { template: 'test' },
    });

    expect(mockRepo.createAndSave).toHaveBeenCalledWith(
      expect.anything(),
      NotificationStatus.RETRYING,
    );
    expect(mockQueue.handle).toHaveBeenCalledWith('abc-123');
  });
});
