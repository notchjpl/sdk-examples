dotenv.config();
import dotenv from "dotenv";

import {
  AssetFactory,
  Topia,
  DroppedAssetFactory,
  UserFactory,
  WorldFactory,
} from "@rtsdk/topia";

const config = {
  apiDomain: process.env.INSTANCE_DOMAIN || "https://api.topia.io/",
  apiKey: process.env.API_KEY,
  interactiveKey: process.env.INTERACTIVE_KEY,
  interactiveSecret: process.env.INTERACTIVE_SECRET,
};

const myTopiaInstance = new Topia(config);

const DroppedAsset = new DroppedAssetFactory(myTopiaInstance);
const User = new UserFactory(myTopiaInstance);
const World = new WorldFactory(myTopiaInstance);
const Asset = new AssetFactory(myTopiaInstance);

export { myTopiaInstance, DroppedAsset, User, World, Asset };
