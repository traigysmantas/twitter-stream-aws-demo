import { StreamItem } from 'common/interfaces/StreamItem.interface';

export const isEmpty = (obj: Object) => Object.keys(obj).length === 0;

export const isStreamRunning = (streamItem: StreamItem) => streamItem && streamItem.currentStatus=== 'ON';