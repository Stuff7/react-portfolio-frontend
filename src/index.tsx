import "./polyfills.js";
import "react-app-polyfill/ie9";
import "./assets/css/Fonts.css";
import {$onready, $} from "./utils/dry";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "./state/store";
import Stuff7 from "./components/Stuff7";

$onready(function() {
  render(
    <Provider store={store}>
      <Stuff7/>
    </Provider>,
    $("#stuff7"));
});
