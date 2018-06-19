import {
    MOVE_LAYER,
    ADD_LAYER,
    REMOVE_LAYER_AT,
    SET_DURATION,
    SET_FPS,
    SET_HEIGHT,
    SET_START,
    SET_WIDTH,
    UPDATE_LAYER,
} from "../constants";

import { store } from "../store";

jest.useFakeTimers();

describe("composition reducer", () => {
    it("sets fps", () => {
        store.dispatch({
            type: SET_FPS,

            fps: 30,
        });
        expect(store.getState().composition.fps).toEqual(30);
    });
    it("sets duration", () => {
        store.dispatch({
            type: SET_DURATION,

            duration: 10,
        });
        expect(store.getState().composition.duration).toEqual(10);
    });
    it("sets height", () => {
        store.dispatch({
            type: SET_HEIGHT,

            height: 100,
        });
        expect(store.getState().composition.height).toEqual(100);
    });
    it("sets width", () => {
        store.dispatch({
            type: SET_WIDTH,

            width: 100,
        });
        expect(store.getState().composition.width).toEqual(100);
    });
    it("can add a layer", () => {
        store.dispatch({
            type: ADD_LAYER,

            layer: {},
        });
        store.dispatch({
            type: ADD_LAYER,

            layer: {},
        });
        expect(store.getState().composition.layers.length).toEqual(2);
    });
    it("can remove a layer", () => {
        store.dispatch({
            type: REMOVE_LAYER_AT,

            at: 1,
        });
        expect(store.getState().composition.layers.length).toEqual(1);
    });
    it("can update a layer", () => {
        store.dispatch({
            type: UPDATE_LAYER,

            index: 0,
            layerAction: {
                type: SET_START,

                start: 20,
            },
        });
        expect(store.getState().composition.layers[0].start).toEqual(20);
    });
    it("can move a layer", () => {
        store.dispatch({
            type: ADD_LAYER,

            layer: {
                id: 14,
            },
        });
        store.dispatch({
            type: MOVE_LAYER,

            from: 0,
            to: 1,
        });

        expect(store.getState().composition.layers[0].id).toEqual(14);
    });
});
