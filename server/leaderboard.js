const axios = require("axios");
const { publicAPI } = require("./utils");

const updateLeaderboard = (req, res) => {
  let leaderboardObject = {};
  if (!req.body) return;
  let leaderboardArray = req.body.rows.split(",");

  // Create the object from raw data
  for (let i = 0; i < leaderboardArray.length; i++) {
    switch (i % 5) {
      case 0:
        leaderboardObject[leaderboardArray[i]] = {};
        break;
      case 1:
        leaderboardObject[leaderboardArray[i - 1]].completed = parseInt(
          leaderboardArray[i]
        );
        break;
      case 4:
        leaderboardObject[leaderboardArray[i - 4]].accuracy = parseFloat(
          leaderboardArray[i]
        );
        break;
      default:
        break;
    }
  }

  createLeaderboard(leaderboardObject);
  res.send("Successfully updated!");
};

const createLeaderboard = (leaderboardObject) => {
  let accuracyLeaderboard = Object.keys(leaderboardObject)
    .sort((a, b) => {
      console.log(a);
      console.log(b);
      return leaderboardObject[b].accuracy - leaderboardObject[a].accuracy;
    })
    .map((element) => {
      return { ...leaderboardObject[element], department: element };
    });

  let completedLeaderboard = Object.keys(leaderboardObject)
    .sort((a, b) => {
      return leaderboardObject[b].completed - leaderboardObject[a].completed;
    })
    .map((element) => {
      return { ...leaderboardObject[element], department: element };
    });

  console.log(accuracyLeaderboard);
  console.log(completedLeaderboard);

  publicAPI(process.env.LEADERBOARD_API_KEY)
    .get(`/world/${process.env.LEADERBOARD_URL_SLUG}/assets`, {})
    .then((response) => {
      const { data } = response;
      let existingLeaderboards = {
        AccuracyLeaderboard: {
          department: {},
          completed: {},
          accuracy: {},
        },
        CompletedLeaderboard: {
          department: {},
          completed: {},
          accuracy: {},
        },
      };

      data.forEach((element) => {
        const { uniqueName } = element;
        if (
          uniqueName &&
          (uniqueName.includes("AccuracyLeaderboard") ||
            uniqueName.includes("CompletedLeaderboard"))
        ) {
          const tempArray = uniqueName.split("_");
          const board = tempArray[0];
          const category = tempArray[1].toLowerCase();
          const order = tempArray[2];
          existingLeaderboards[board][category][order] = element;
        }

        console.log(existingLeaderboards);
        // console.console.log("ID to delete", id);

        // for (let i = 0; i < completedLeaderboard.length; i++) {
        // const boardString = "CompletedLeaderboard";
        //   prepareAssetText(
        //   boardString,
        //   existingLeaderboards[boardString],
        //   accuracyLeaderboard[i],
        //   i
        // );
        // }
      });
      for (let i = 0; i < accuracyLeaderboard.length; i++) {
        const boardString = "AccuracyLeaderboard";
        prepareAssetText(
          boardString,
          existingLeaderboards[boardString],
          accuracyLeaderboard[i],
          i
        );
      }
    });
};

const prepareAssetText = (boardString, boardObj, newItem, index) => {
  const prepByCategory = (cat) => {
    const asset = boardObj[cat][index];
    if (!asset) {
      console.log("No asset for index", index);
      return;
    }
    const { id } = asset;
    updateAssetText(id, newItem[cat].toString());
  };

  prepByCategory("department");
  setTimeout(() => prepByCategory("completed"), 500);
  setTimeout(() => prepByCategory("accuracy"), 1000);
};

const updateAssetText = (id, text) => {
  console.log(id, text);
  publicAPI(process.env.LEADERBOARD_API_KEY).put(
    `/world/${process.env.LEADERBOARD_URL_SLUG}/assets/${id}/set-custom-text`,
    { text }
  );
};

module.exports = { updateLeaderboard };
