type ScrollCallback = (sl: Index) => void;
declare class Index {
    constructor(target: HTMLElement, leftPercentOfNextLoad: number);
    private readonly _measure;
    private readonly _target;
    private readonly _event;
    private _callback;
    private _on;
    private _init;
    callback(scrollCallback: ScrollCallback): Index;
    get needReload(): boolean;
    next(isNext?: boolean): void;
    destroy(): void;
}
export default function (target?: HTMLElement, leftPercentOfNextLoad?: number): Index;
export {};
