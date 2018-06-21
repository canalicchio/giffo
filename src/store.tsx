
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from "redux";

// import { CompositionAction } from "./actions/composition";
// import { PlayerAction } from "./actions/player";

import { compositionReducer } from "./reducers/composition";

import { rendererReducer } from "./reducers/renderer";

import {
    PlayerInitialState,
    playerMiddleware,
    playerReducer,
} from "./reducers/player";

import { StoreState } from "./types/index";

const mainReducer = combineReducers({
    composition: compositionReducer,
    player: playerReducer,
    renderer: rendererReducer,
});

export const store = createStore<StoreState, any, any, any>(mainReducer, {
    player: PlayerInitialState,
}, applyMiddleware(playerMiddleware));
