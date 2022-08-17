var express = require("express");
const User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get("/match", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      {
        $match: {
          lastname: "Ahmed",
        },
      },
    ]);
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/group", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      {
        $group: {
          _id: "$department",
        },
      },
    ]);
    res.status(200).json(user);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/skipSort", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      {
        $group: {
          _id: "$department",
          // avgM:{
          //   $avg:"$marks"
          // }
        },
      },

      // {
      //   $skip: 1,
      // },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/ProjectType", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      {
        $match: {
          lastname: "Ahmed",
        },
      },
      {
        // $project: {
        //   firstname: 1,
        //   post: 1,
        //   _id: 0,
        // },
        // $project: {
        //   name: "$firstname",
        //   post: "$post",
        //   _id: 0,
        // }
        $project: {
          name: { $type: "$firstname" },
          post: { $type: "$post" },
          _id: 0,
        },
      },
    ]);
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/count", async function (req, res, next) {
  try {
    // let user = await User.aggregate([
    //   // {
    //   //   $match: {
    //   //     lastname: "Ahmed",
    //   //   },
    //   // },
    //   {
    //     $count: "total",
    //   },
    // ]);
    // res.status(200).json(user);

    let user = await User.find().count();
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/limit", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      // {
      //   $match: {
      //     lastname: "Ahmed",
      //   },
      // },
      {
        $limit: 3,
      },

      {},
    ]);
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/unwind", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      // {
      //   $unwind: "$skills",
      // },
      // {
      //   $match: {
      //     firstname: "abeer",
      //   },
      // },
      // {
      //   $project: {
      //     firstname: 1,
      //     skills: 1,
      //     _id: 0,
      //   },
      // },
      {
        $unwind: "$skills",
      },
      {
        $group: {
          _id: "$skills",
        },
      },
    ]);
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/matchGroup", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      {
        $match: {
          department: {
            $in: ["Tech"],
          },
        },
      },
      {
        $group: {
          _id: "$department",
        },
      },
    ]);
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/out", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      {
        $match: {
          skills: "Reactjs",
        },
      },
      {
        $project: {
          firstname: 1,
          post: 1,
          skills: 1,
          _id: 0,
        },
      },
      {
        $out: "Reactjs Developers",
      },
    ]);
    res.status(200).json(user);
  } catch (error) {}
});

router.get("/lookup", async function (req, res, next) {
  try {
    let user = await User.aggregate([
      {
        $lookup: {
          from: "Reactjs Developers",
          localField: "department",
          foreignField: "departmentName",
          as: "Reactjs Developer Table",
        },
      },
    ]);
    res.status(200).json(user);
  } catch (error) {}
});
module.exports = router;
