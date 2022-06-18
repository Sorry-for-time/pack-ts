interface MyEvent {
  on: () => void;
  emit: () => void;
  once: () => void;
  off: () => void;
}

class Dispatch implements MyEvent {
  constructor() {

  }
  on(): void {}
  emit(): void {}
  once(): void {}
  off(): void {}
}
