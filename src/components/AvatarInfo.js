export default class AvatarInfo {

  constructor(userAvatarSelector) {
    this._userAvatarSelector = userAvatarSelector;
  }

  getUserInfo() {
    this.userData = {};
    this.userData.name = this._userNameSelector.textContent;
    this.userData.info = this._userInfoSelector.textContent;
    return this.userData;
  }

  setUserAvatar(url) {
    this._userAvatarSelector.src = url.link;
  }

}
