import { makeAutoObservable } from "mobx";

class BackInStockStore {
  private static _instance: BackInStockStore;
  pending = false;
  visibleModal: null | "backInStock" | "loginRequired" = null;

  private constructor() {
    makeAutoObservable(this);
  }

  static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new BackInStockStore();
    return this._instance;
  }
}

export function useBackInStockStore() {
  const store = BackInStockStore.getInstance();
  return store;
}
