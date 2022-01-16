import { PlayerClient } from "./player/player";
import { RecorderClient } from "./recorder";

const recorderClient = new RecorderClient();
const playerClient = new PlayerClient();

recorderClient.start();
playerClient.start();
