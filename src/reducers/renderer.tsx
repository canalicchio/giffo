import { RendererAction } from "../actions/renderer";

import {
    ANIMATORS_UPDATED,
    UPDATE_LAYER,
} from "../constants/";

import {
    RendererState,
} from "../types/index";

export const RendererInitialState: RendererState = {
    animatorsDirty: true,
};

export function rendererReducer(state: RendererState = RendererInitialState, action: RendererAction): RendererState {
    switch (action.type) {
        case UPDATE_LAYER:

            return {
                animatorsDirty: true,
            };
        case ANIMATORS_UPDATED:
            return {
                animatorsDirty: false,
            };
    }
    return state;
}
