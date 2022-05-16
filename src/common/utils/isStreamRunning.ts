import { StreamItem } from 'common/interfaces/StreamItem.interface';

export const isStreamRunning = (streamItem: StreamItem) => streamItem && streamItem.currentStatus=== 'ON';