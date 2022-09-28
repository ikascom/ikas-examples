import { makeAutoObservable } from "mobx";

export default class UIStore {
  private static _instance: UIStore;
  sidenavVisible = false;
  searchKeyword = "";
  maxQuantityPerCartProductErrorModal: {
    visible: boolean;
    productName: string;
  } = {
    visible: false,
    productName: "",
  };

  private constructor() {
    makeAutoObservable(this);
  }

  toggleSidenav = () => {
    this.sidenavVisible = !this.sidenavVisible;
  };

  openSidenav = () => {
    this.sidenavVisible = true;
  };

  closeSidenav = () => {
    this.sidenavVisible = false;
  };

  static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new UIStore();
    return this._instance;
  }
}
