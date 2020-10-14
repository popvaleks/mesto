export default class UserInfo {

  constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
  }

  getUserInfo() {
    this.userData = {};
    this.userData.name = this._userNameSelector.textContent;
    this.userData.about = this._userInfoSelector.textContent;
    return this.userData;
  }

  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userInfoSelector.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userAvatarSelector.src = data.avatar;
  }
}
