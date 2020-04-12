const express = require("express");

const router = express.Router();
const itineraryModel = require("../model/itineraryModel");

/*get all cities*/
router.get("/all", (_req, res) => {
  itineraryModel
    .find({})
    .then((itineraries) => {
      res.send(itineraries);
    })
    .catch((err) => console.log(err));
});
//this is how you implement a city route by specific city
router.get("/:name", (req, res) => {
  let itineraryRequested = req.params.name;
  itineraryModel
    .find({ name: itineraryRequested })
    .then((itinerary) => {
      res.send(itinerary);
    })
    .catch((err) => console.log(err));
});
/////////////post user to the itenerary
router.post("/:name/favorites", (req, res) => {
  let email = req.body.email;
  // console.log(user);
  let name = req.params.name;
  itineraryModel.findOne({ name: name }).then((itinerary) => {
    itinerary.favorites.push(email);
    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
});
///////////////////delete user from favorite itinerary

router.delete("/:name/favorites", (req, res) => {
  const name = req.params.name;
  const email = req.body.email;
  itineraryModel
    .findOne({ name: name })
    .then((itinerary) => {
      ///////apply js
      let index = itinerary.favorites.indexOf(email);
      itinerary.favorites.splice(index, 1);
      itinerary.save().then((saveditinerary) => {
        res.status(200).send(saveditinerary);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error");
    });
});

/////////////post comment to the itenerary
router.post("/:name/comments", (req, res) => {
  let newComments = req.body.comments;
  let email = req.body.email;
  let name = req.params.name;
  itineraryModel.findOne({ name: name }).then((itinerary) => {
    itinerary.comments.push(email);
    itinerary.save().then((saveditinerary) => {
      res.status(200).send(saveditinerary);
    });
  });
});
router.get("/test", (req, res) => {
  res.send({ msg: "itinerary test route." });
});
module.exports = router;
