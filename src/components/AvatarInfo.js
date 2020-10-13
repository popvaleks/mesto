export default class AvatarInfo {

  constructor(userAvatarSelector) {
    this._userAvatarSelector = userAvatarSelector;
  }

  getUserAvatar() {
    this.userData = {};
    this.userData.src = this._userAvatarSelector.textContent;
    return this.userData;
  }

  setUserAvatar(data) {
    this._userAvatarSelector.src = data.avatar;
  }

}
