type PollOptions = {
  intervalMs: number;
  tick: () => Promise<void> | void;
  shouldStop: () => boolean;
  checkMs?: number;
  onStop?: () => void;
};
