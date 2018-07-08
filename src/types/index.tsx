
export type Keyframe = Readonly<{
    id: string;
    property: string;
    frame: number;
    value: number | string;
    easing?: string;
}>;

export type Property = Readonly<{
    name: string;
    value: number | string;
}>;

export type RenderableState = Readonly<{
    type: string;
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
    currentLayer: number;
    currentKeyframe: number;
}>;

export type RendererState = Readonly<{
    animatorsDirty: boolean;
    animatorsTree: any[];
    renderTree: any[];
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
    renderer: RendererState;
}>;
