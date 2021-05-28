import { BaseComponent } from '../../shared/base-component';

export class Player extends BaseComponent {
  playerPhoto: BaseComponent;

  playerInfo: BaseComponent;

  playerName: BaseComponent;

  playerEmail: BaseComponent;

  playerScore: BaseComponent;

  scoreLabel: BaseComponent;

  scoreValue: BaseComponent;

  constructor(playerPhotoSRC: string, playerFirstName: string,
    playerLastName: string, playerEmail: string, playerScore: string) {
    super('div', ['player']);
    this.playerPhoto = new BaseComponent('img', ['player__avatar']);
    this.playerPhoto.element.setAttribute('alt', 'Avatar');
    this.playerPhoto.element.setAttribute('src', playerPhotoSRC);
    this.playerInfo = new BaseComponent('div', ['player__info']);
    this.playerName = new BaseComponent('div', ['player__name']);
    this.playerName.element.innerText = `${playerFirstName} ${playerLastName}`;
    this.playerEmail = new BaseComponent('div', ['player__email']);
    this.playerEmail.element.innerText = `${playerEmail}`;
    this.playerScore = new BaseComponent('div', ['player__score']);
    this.scoreLabel = new BaseComponent('div', ['score-label']);
    this.scoreLabel.element.innerText = 'Score: ';
    this.scoreValue = new BaseComponent('div', ['score-value']);
    this.scoreValue.element.innerText = `${playerScore}`;
  }

  render() {
    this.element.append(this.playerPhoto.element, this.playerInfo.element, this.playerScore.element);
    this.playerInfo.element.append(this.playerName.element, this.playerEmail.element);
    this.playerScore.element.append(this.scoreLabel.element, this.scoreValue.element);

    return this.element;
  }
}
