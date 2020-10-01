export default class UserInfo {

  constructor(userNameSelector, userInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
  }

  getUserInfo() {
    this.userData = {};
    this.userData.name = this._userNameSelector.textContent;
    this.userData.info = this._userInfoSelector.textContent;
    return this.userData;
  }

  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userInfoSelector.textContent = data.info;
  }

}
