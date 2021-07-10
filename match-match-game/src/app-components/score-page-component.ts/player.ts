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
    this.getPlayerPhoto().setAttribute('alt', 'Avatar');
    this.getPlayerPhoto().setAttribute('src', this.photoSRC.toString());
  }

  initializePlayerName() {
    this.getPlayerName().innerText = `${this.firstName} ${this.lastName}`;
  }

  initializePlayerEmail() {
    this.getPlayerEmail().innerText = `${this.email}`;
  }

  initializeScoreLabel() {
    this.getScoreLabel().innerText = 'Score: ';
  }

  initializeScoreValue() {
    this.getScoreValue().innerText = `${this.score}`;
  }

  getPlayerPhoto() {
    return this.playerPhoto.element;
  }

  getPlayerName() {
    return this.playerName.element;
  }

  getPlayerEmail() {
    return this.playerEmail.element;
  }

  getScoreLabel() {
    return this.scoreLabel.element;
  }

  getScoreValue() {
    return this.scoreValue.element;
  }

  getPlayerInfo() {
    return this.playerInfo.element;
  }

  getPlayerScore() {
    return this.playerScore.element;
  }

  render() {
    this.element.append(this.getPlayerPhoto(), this.getPlayerInfo(), this.getPlayerScore());
    this.getPlayerInfo().append(this.getPlayerName(), this.getPlayerEmail());
    this.getPlayerScore().append(this.getScoreLabel(), this.getScoreValue());

    return this.element;
  }
}
