type ScrollCallback = (sl: Index) => void

class Index {

  constructor(target: HTMLElement, leftPercentOfNextLoad: number) {
    this._target = target;
    this._measure = leftPercentOfNextLoad;
    this._init();
  }

  private readonly _measure: number;
  private readonly _target: HTMLElement;
  private readonly _event = () => {
    if (this._on && this.needReload) {
      this._on = false;
      this._callback(this);
    }
  }
  private _callback: ScrollCallback = () => {};
  private _on = false;

  private _init() {
    if (!(this._measure >= 0.1 && this._measure <= 0.8)) {
      throw 'measure is wrong : 0.8 >= measure >= 0.1';
    }

    window.addEventListener('scroll', this._event, true);
    window.addEventListener('resize', this._event, true);
  }

  public callback(scrollCallback: ScrollCallback): Index {
    this._callback = scrollCallback;
    return this;
  }

  public get needReload() {
    const scrollSize = this._target.scrollHeight;
    const objectSize = this._target.clientHeight;
    const scrollEnd = objectSize + this._target.scrollTop;

    return (scrollSize - (objectSize * this._measure)) <= scrollEnd;
  }

  public next(isNext: boolean = true) {
    if ((this._on = isNext)) {
      this._event();
    }
  }

  public destroy() {
    this._on = false;
    window.removeEventListener('scroll', this._event, true);
    window.removeEventListener('resize', this._event, true);
  }
}

export default function(target: HTMLElement = document.documentElement, leftPercentOfNextLoad: number = 0.3): Index {
  return new Index(target, leftPercentOfNextLoad);
};
