
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import React from "react";
import ReactDOM from "react-dom";
import config from "../../config/firebase.json";
import { Homepage } from "./homepage";
import {initWorker} from "./init-worker";

firebase.initializeApp(config);

initWorker();

ReactDOM.render(
  <Homepage></Homepage>,
  document.getElementById("app"),
);
