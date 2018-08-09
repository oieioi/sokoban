import { Record, List } from 'immutable';
import TILES from "../const/TileConst"

export default class Map extends Record({map: '', playerX: null, playerY: null}) {

  up() {
    if (!this.canMoveUp()) {
      return this;
    }

    const newMap = this.playerMoveUp();
    return this.set("map", this.toString(newMap))
  }

  down() {
    //TODO: 共通化
    if (!this.canMoveDown()) {
      return this;
    }

    const newMap = this.playerMoveDown();
    return this.set("map", this.toString(newMap))
 
  }

  right() {
    if (!this.canMoveRight()) {
      return this;
    }

    const newMap = this.playerMoveRight();
    return this.set("map", this.toString(newMap))
 
  }

  left() {
    if (!this.canMoveLeft()) {
      return this;
    }

    const newMap = this.playerMoveLeft();
    return this.set("map", this.toString(newMap))
  }

  solved() {
    return false;
  }

  /**
   * @param {Stirng} mapString raw map
   */
  toArray () {
    const ary = [];
    let lineCount = 0;
    this.get('map').split('').forEach(s => {
      if (s === TILES.NEW_LINE) {
        lineCount++;
        return;
      }
      if (ary[lineCount] == null) {
        ary[lineCount] = [];
      }
      ary[lineCount].push(s);
    });
    return ary;
  }

  toString (arraiedMap) {
    return arraiedMap.map( m => m.join('') ).join('n');
  }

  canMoveUp()    { return this._canMoveTo('up'); }
  canMoveDown()  { return this._canMoveTo('down'); }
  canMoveRight() { return this._canMoveTo('right'); }
  canMoveLeft()  { return this._canMoveTo('left'); }

  _canMoveTo(direction) {
    const playerPoint = this._getPlayer();
    const targetPoint = this[`${direction}Point`](playerPoint);
    const targetTile = this._getTile(targetPoint);
    return targetTile.canEnter();
  }

  playerMoveUp() { return this._playerMoveTo('up') }
  playerMoveDown() { return this._playerMoveTo('down') }
  playerMoveRight() { return this._playerMoveTo('right') }
  playerMoveLeft() { return this._playerMoveTo('left') }

  _playerMoveTo(direction) {
    const playerPoint = this._getPlayer();
    const targetPoint = this[`${direction}Point`](playerPoint);

    // TODO List つかう
    let nowMap = this.toArray();

    const player = this._getTile(playerPoint);
    const target = this._getTile(targetPoint);

    // TODO: rawすぎる
    nowMap[playerPoint.y][playerPoint.x] = player.previousTile();
    nowMap[targetPoint.y][targetPoint.x] = TILES.PLAYER;

    player.previous = target.toString();

    return nowMap;
  }


  upPoint({x, y}) { return {x, y: y - 1} }
  downPoint({x, y}) { return {x, y: y + 1} }
  rightPoint({x, y}) { return {x: x + 1, y} }
  leftPoint({x, y}) { return {x: x - 1, y} }

  _getPlayer() {
    if (this.playerX == null || this.playerY == null) {
      const playerP = this._findPoints(TILES.PLAYER);
      this.set(playerY, playerP.y);
      this.set(playerX, playerP.x);
    }

    const points = this._findPoints(TILES.PLAYER);
    return points[0];
  }

  _findPoints(target) {
    const ary = this.toArray();
    let result = [];

    ary.find( (line, lineIndex) => {
      const found = line.find( (p, index) => {
        if (p === target) {
          result.push({x: index, y: lineIndex});
        }
      });
    })

    return result;
  }

  _getTile({x, y}) {
    const rawTile = this.toArray()[y][x];

    return this.createTile(rawTile);
  }

  createTile(raw) {
    switch(raw) {
      case TILES.EMPTY:       return new Empty(raw);
      case TILES.PLAYER:      return new Player(raw);
      case TILES.BOX:         return new Box(raw);
      case TILES.RIGHT_PLACE: return new RightPlace(raw);
      case TILES.WALL:        return new Wall(raw);
      defult: throw new Error('変なタイルだよ', raw);
    }
  }
}

class Tile {
  constructor(raw) {
    this.raw = raw;
  }
  toString() {
    return this.raw;
  }
  canEnter() {
    throw Error('not implemented!');
  }
}

class Empty extends Tile { canEnter() { return true } }
class Player extends Tile {
  constructor() {
    super();
    // TODO: 以前のタイルを保存する仕組み
    this.previous = TILES.EMPTY;
  }
  canEnter() { return false }
  previousTile() { return this.previous; }
}
class Box extends Tile { canEnter() { return true } }
class RightPlace extends Tile { canEnter() { return true } }
class Wall extends Tile { canEnter() { return false } }

