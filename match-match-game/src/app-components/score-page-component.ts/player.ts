import { BaseComponent } from '../../shared/base-component';

export class Player extends BaseComponent {
  playerPhoto: BaseComponent;
  playerInfo: BaseComponent;
  playerName: BaseComponent;
  playerEmail: BaseComponent;
  playerScore: BaseComponent;
  scoreLabel: BaseComponent;
  scoreValue: BaseComponent;

  constructor(readonly photoSRC: string | number, readonly firstName: string | number,
    readonly lastName: string | number, readonly email: string | number, readonly score: string | number) {
    super('div', ['player']);
    this.playerPhoto = new BaseComponent('img', ['player__avatar']);
    this.playerInfo = new BaseComponent('div', ['player__info']);
    this.playerName = new BaseComponent('div', ['player__name']);
    this.playerEmail = new BaseComponent('div', ['player__email']);
    this.playerScore = new BaseComponent('div', ['player__score']);
    this.scoreLabel = new BaseComponent('div', ['score-label']);
    this.scoreValue = new BaseComponent('div', ['score-value']);
    this.initialize();
  }

  initialize() {
    this.initializePlayerPhoto();
    this.initializePlayerName();
    this.initializePlayerEmail();
    this.initializeScoreLabel();
    this.initializeScoreValue();
  }

  initializePlayerPhoto() {
    this.playerPhoto.element.setAttribute('alt', 'Avatar');
    this.playerPhoto.element.setAttribute('src', this.photoSRC.toString());
  }

  initializePlayerName() {
    this.playerName.element.innerText = `${this.firstName} ${this.lastName}`;
  }

  initializePlayerEmail() {
    this.playerEmail.element.innerText = `${this.email}`;
  }

  initializeScoreLabel() {
    this.scoreLabel.element.innerText = 'Score: ';
  }

  initializeScoreValue() {
    this.scoreValue.element.innerText = `${this.score}`;
  }

  render() {
    this.element.append(this.playerPhoto.element, this.playerInfo.element, this.playerScore.element);
    this.playerInfo.element.append(this.playerName.element, this.playerEmail.element);
    this.playerScore.element.append(this.scoreLabel.element, this.scoreValue.element);

    return this.element;
  }
}
