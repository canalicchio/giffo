import {
    PAUSE,
    PLAY,
    SEEK_FRAME,
    STEP_FRAME_BACKWARD,
    STEP_FRAME_FORWARD,
} from "../constants";

import { store } from "../store";

jest.useFakeTimers();

describe("player", () => {
    it("change state when plays", () => {
        store.dispatch({
            type: PLAY,
        });
        expect(store.getState().player.playing).toEqual(true);
        expect(setInterval).toHaveBeenCalledTimes(1);
    });
    it("change state when pause", () => {
        global.clearInterval = jest.fn();

        store.dispatch({
            type: PAUSE,
        });
        expect(store.getState().player.playing).toEqual(false);
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });
    it("plays at the proper FPS", () => {
        global.setInterval = jest.fn();

        store.dispatch({
            type: PLAY,
        });

        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000 / store.getState().player.fps);
    });
    it("seek to a frame", () => {
        store.dispatch({
            type: SEEK_FRAME,

            frame: 10,
        });
        expect(store.getState().player.currentFrame).toEqual(10);
    });
    it("pause when seek", () => {
        global.clearInterval = jest.fn();
        store.dispatch({
            type: PLAY,
        });

        store.dispatch({
            type: SEEK_FRAME,

            frame: 10,
        });

        expect(store.getState().player.playing).toEqual(false);
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it("doesn't seek to a frame greater than the duration", () => {
        store.dispatch({
            frame: 100,
            type: SEEK_FRAME,
        });
        const state = store.getState();
        expect(state.player.currentFrame).toEqual(state.player.duration * state.player.fps);
    });
    it("doesn't seek to a frame lower than 0", () => {
        store.dispatch({
            frame: -10,
            type: SEEK_FRAME,
        });
        expect(store.getState().player.currentFrame).toEqual(0);
    });
    it("step backward", () => {
        store.dispatch({
            type: SEEK_FRAME,

            frame: 1,
        });
        store.dispatch({
            type: STEP_FRAME_BACKWARD,
        });
        expect(store.getState().player.currentFrame).toEqual(0);
    });
    it("step forward", () => {
        store.dispatch({
            type: SEEK_FRAME,

            frame: 0,
        });
        store.dispatch({
            type: STEP_FRAME_FORWARD,
        });
        expect(store.getState().player.currentFrame).toEqual(1);
    });
});
