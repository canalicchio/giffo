import {
    Keyframe,
} from "../types/";

import anime from "animejs";

export const keyframesToAnimators = (keyframes: Keyframe[], values: any): any => {
    const props = keyframes.reduce((acc, k: Keyframe, i) => {
        if (!acc[k.property]) {
            acc[k.property] = {
                keyframes: [],
            };
        }

        acc[k.property].keyframes.push(k);
        return acc;
    }, {});

    Object.keys(props).forEach((p) => {
        props[p].keyframes.sort((a: Keyframe, b: Keyframe) => a.frame > b.frame);
        if (props[p].keyframes.length > 0) {
            values[p] = props[p].keyframes[0].value;
        }
        if (props[p].keyframes.length > 1) {
            const animeKeyframes: any[] = [];
            let currentFrame = 0;
            props[p].keyframes.forEach((k: Keyframe, i: number) => {
                const duration = k.frame - currentFrame;

                animeKeyframes.push({
                    duration,
                    value: k.value,
                });

                currentFrame = duration;
            });
            props[p].animation = anime({
                targets: values,

                autoplay: false,
                easing: "easeInOutQuart",
                [p]: animeKeyframes,
            });
        }
    });
    return props;
};
