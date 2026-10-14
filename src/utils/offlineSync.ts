export interface OfflineReportDraft {
  localId: string;
  title: string;
  description: string;
  category: any;
  latitude: number;
  longitude: number;
  areaName?: string;
  landmark?: string;
  imageUrl?: string;
  createdAt: string;
}

const STORAGE_KEY = 'js_offline_reports_queue';

export const offlineSyncManager = {
  getQueue(): OfflineReportDraft[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  enqueue(draft: Omit<OfflineReportDraft, 'localId' | 'createdAt'>): OfflineReportDraft {
    const queue = this.getQueue();
    const item: OfflineReportDraft = {
      ...draft,
      localId: `offline-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
    };
    queue.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    return item;
  },

  remove(localId: string) {
    const queue = this.getQueue().filter((item) => item.localId !== localId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },

  hasPending(): boolean {
    return this.getQueue().length > 0;
  },

  async syncAll(
    submitFn: (item: OfflineReportDraft) => Promise<any>
  ): Promise<{ syncedCount: number; errors: any[] }> {
    const queue = this.getQueue();
    if (queue.length === 0) return { syncedCount: 0, errors: [] };

    let syncedCount = 0;
    const errors: any[] = [];
    const remaining: OfflineReportDraft[] = [];

    for (const item of queue) {
      try {
        await submitFn(item);
        syncedCount++;
      } catch (err) {
        errors.push(err);
        remaining.push(item);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
    return { syncedCount, errors };
  },
};
