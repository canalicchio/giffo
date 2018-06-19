import {
    createStore,
} from "redux";

import { LayerAction } from "../actions/layer";

import {
    LayerInitialState,
    layerReducer,
} from "./layer";

import { RenderableState } from "../types/index";

import {
    ADD_KEYFRAME,
    REMOVE_KEYFRAME,
    SET_LAYER_DURATION,
    SET_START,
    UPDATE_KEYFRAME,
} from "../constants";

const store = createStore<RenderableState, LayerAction, any, any>(layerReducer, LayerInitialState);

jest.useFakeTimers();

describe("layer reducer", () => {
    it("doesnt set start to a negative", () => {
        store.dispatch({
            type: SET_START,

            start: -50,
        });
        expect(store.getState().start >= 0).toEqual(true);
    });
    it("sets start", () => {
        store.dispatch({
            type: SET_START,

            start: 40,
        });
        expect(store.getState().start).toEqual(40);
    });
    it("sets duration", () => {
        store.dispatch({
            type: SET_LAYER_DURATION,
            duration: 50,
        });
        expect(store.getState().duration).toEqual(50);
    });
    it("doesnt set duration to a negative", () => {
        store.dispatch({
            type: SET_LAYER_DURATION,
            duration: -50,
        });
        expect(store.getState().duration > 0).toEqual(true);
    });
    it("adds a keyframe", () => {
        store.dispatch({
            type: ADD_KEYFRAME,
            keyframe: {
                id: '1',
                property: 'x',
                value: 0,
                frame: 0,
            },
        });
        store.dispatch({
            type: ADD_KEYFRAME,
            keyframe: {
                id: '2',
                property: 'y',
                frame: 0,
                value: 0,
            },
        });
        expect(store.getState().keyframes.length).toEqual(2);
    });
    it("removes a keyframe", () => {
        store.dispatch({
            type: REMOVE_KEYFRAME,
            id: '1',
        });
        expect(store.getState().keyframes.length).toEqual(1);
    });
    it("updates a keyframe", () => {
        store.dispatch({
            type: UPDATE_KEYFRAME,
            keyframe: {
                id: '2',
                value: 50,
            },
        });
        expect(store.getState().keyframes[0].value).toEqual(50);
        expect(store.getState().keyframes[0].property).toEqual('y');
    });
});
