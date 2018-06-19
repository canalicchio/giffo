import * as React from "react";
import { Provider } from "react-redux";

import * as ReactDOM from "react-dom";

import App from "./App";

// import { CompositionAction } from "./actions/composition";
// import { PlayerAction } from "./actions/player";

import {
    store,
} from "./store";

import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root") as HTMLElement,
);

store.dispatch({
    type: "PLAY",
});
