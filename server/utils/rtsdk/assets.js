import { Asset } from "./index.js";

export const InteractiveAsset = async ({ id, req }) => {
  const asset = Asset.create(id, { credentials: req.body });

  // This adds your public developer key to the dropped asset so visitors can interact with it in-world.
  await asset.setInteractiveSettings({
    isInteractive: true,
    interactivePublicKey: process.env.INTERACTIVE_KEY,
  });
  return asset;
};
