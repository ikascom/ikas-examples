import { makeAutoObservable } from "mobx";

export default class SliderStore {
  activeImageId?: string;
  private static _instance: SliderStore;

  private constructor() {
    makeAutoObservable(this);
  }

  static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new SliderStore();
    return this._instance;
  }
}
