import StreamItem from 'common/interfaces/StreamItem.interface';

export const isEmpty = (obj: object) => Object.keys(obj).length === 0;

export const isStreamRunning = (streamItem: StreamItem) => streamItem && streamItem.currentStatus=== 'ON';