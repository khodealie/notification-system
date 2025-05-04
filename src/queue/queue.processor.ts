import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { QueueService } from './queue.service';
import { NOTIF_QUEUE } from './queue.constants';
import { JobPayload } from './payloads/job.payload';

@Processor(NOTIF_QUEUE)
@Injectable()
export class QueueProcessor extends WorkerHost {
  constructor(private readonly queueService: QueueService) {
    super();
  }

  async process(job: Job<JobPayload>): Promise<void> {
    await this.queueService.handle(job.data.id);
    await job.updateProgress(100);
  }
}
