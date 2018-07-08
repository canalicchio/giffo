import { RendererAction } from "../actions/renderer";

import {
    ANIMATORS_UPDATED,
    SEEK_FRAME,
    STEP_FRAME_FORWARD,
    UPDATE_LAYER,
} from "../constants/";

import {
    RendererState,
    StoreState,
} from "../types/index";

import { Layer } from "../Layer";

import { keyframesToAnimators } from "../helpers/layer";

import anime from "animejs";

export const RendererInitialState: RendererState = {
    animatorsDirty: true,
    animatorsTree: [],
    renderTree: [],
};

export function rendererReducer(state: RendererState = RendererInitialState, action: RendererAction): RendererState {
    switch (action.type) {
        case UPDATE_LAYER:

            return {
                ...state,

                animatorsDirty: true,
            };
        case ANIMATORS_UPDATED:
            return {
                ...state,

                animatorsDirty: false,

                animatorsTree: action.animatorsTree,
                renderTree: action.renderTree,
            };
    }
    return state;
}

import {
    Middleware,
} from "redux";

export const rendererMiddleware: Middleware<RendererAction|any, StoreState> =
    (store) => (next) => (action) =>  {

        const state = store.getState();

        if (action.type === SEEK_FRAME || action.type === STEP_FRAME_FORWARD) {
            state.renderer.animatorsTree.forEach((l: any, index: number) => {
                Object.keys(l).forEach((p: string) => {
                    const anim: anime.AnimeInstance = l[p].animation;
                    if (anim) {
                        const ms = 1.0 / state.player.fps * 1000;
                        anim.seek(state.player.currentFrame * ms - state.composition.layers[index].start * 1000);
                    }
                });
            });
        } else if (action.type !== ANIMATORS_UPDATED && state.renderer.animatorsDirty) {
            const animatorsTree: any[] = [];
            const renderTree: any[] = [];

            state.composition.layers.forEach((l) => {
                const layerTypeClass: any = require(`../layers/${l.type}`).default;

                const keyframes = l.keyframes;

                const defaultProps: any = {
                    ...Layer.getLayerProperties(),
                    ...layerTypeClass.getLayerProperties(),
                };

                console.log(defaultProps);

                const values = {};

                Object.keys(defaultProps).forEach((p) => {
                    values[p] = defaultProps[p].defaultValue;
                });

                renderTree.push(values);
                animatorsTree.push(keyframesToAnimators(keyframes, values));
            });
            store.dispatch({
                type: ANIMATORS_UPDATED,

                animatorsTree,
                renderTree,
            });

        }
        next(action);
    };
