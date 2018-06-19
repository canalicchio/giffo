
export type Keyframe = Readonly<{
    id: string;
    property: string;
    frame: number;
    value: number | string;
    easing: string;
}>;

export type RenderableState = Readonly<{
    duration: number;
    start: number;
    keyframes: Keyframe[];
}>;

export type CompositionState = Readonly<{
    width: number;
    height: number;
    duration: number;
    layers: RenderableState[];
    fps: number;
}>;

export type PlayerState = Readonly<{
    currentFrame: number;
    playing: boolean;
    duration: number;
    fps: number;
}>;

export type StoreState = Readonly<{
    player: PlayerState;
    composition: CompositionState;
}>;
