import dotenv from "dotenv";
dotenv.config();

import { AssetFactory, Topia, DroppedAssetFactory, UserFactory, WorldFactory } from "@rtsdk/topia";

const config = {
  apiDomain: process.env.INSTANCE_DOMAIN || "https://api.topia.io/",
  apiProtocol: process.env.INSTANCE_PROTOCOL || "https",
  // apiKey: process.env.API_KEY,
  interactiveKey: process.env.INTERACTIVE_KEY,
  interactiveSecret: process.env.INTERACTIVE_SECRET,
};

const myTopiaInstance = new Topia(config);

const Asset = new AssetFactory(myTopiaInstance);
const DroppedAsset = new DroppedAssetFactory(myTopiaInstance);
const User = new UserFactory(myTopiaInstance);
const World = new WorldFactory(myTopiaInstance);

export { Asset, DroppedAsset, myTopiaInstance, User, World };
