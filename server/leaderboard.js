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
    .map((element) => leaderboardObject[element]);

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
      let existingAccuracyArray = {
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
        const { id, uniqueName } = element;
        if (
          uniqueName &&
          (uniqueName.contains("AccuracyLeaderboard") ||
            uniqueName.contains("CompletedLeaderboard"))
        ) {
          const tempArray = uniqueName.split("_");
          const board = tempArray[0];
          const category = tempArray[1];
          const order = tempArray[2];
          existingAccuracyArray[board][category][order] = element;
        }

        console.log("ID to delete", id);
        for (let i = 0; i < 10; i++) {}
      });
    });
};

module.exports = { updateLeaderboard };
