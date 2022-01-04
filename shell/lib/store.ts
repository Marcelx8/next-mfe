import create, { UseBoundStore, StoreApi } from 'zustand';

export type store = UseBoundStore<{ count: number, increment: () => void, decrement: () => void }, StoreApi<{ count: number, increment: () => void, decrement: () => void }>>;

const useStore: store = create<{
  count: number,
  increment: () => void,
  decrement: () => void,
}>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));

export default useStore;