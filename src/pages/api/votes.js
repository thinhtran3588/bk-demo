// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import "../../api/mongo";
const DEFAULT_VOTES = { likes: 0, dislikes: 0 };

const votesScheme = new mongoose.Schema({
  likes: Number,
  dislikes: Number,
});

const Votes = mongoose.models.votes || mongoose.model("votes", votesScheme);

const addLike = async () => {
  let votesInDb = await Votes.findOne().exec();
  console.log(votesInDb);
  if (!votesInDb) {
    votesInDb = Votes(DEFAULT_VOTES);
  }
  votesInDb.likes++;
  await votesInDb.save();
};

const addDislike = async () => {
  let votesInDb = await Votes.findOne().exec();
  if (!votesInDb) {
    votesInDb = Votes(DEFAULT_VOTES);
  }
  votesInDb.dislikes++;
  await votesInDb.save();
};

const getVotes = async () => {
  const votesInDb = await Votes.findOne().exec();
  return votesInDb || DEFAULT_VOTES;
};

export default async (req, res) => {
  res.statusCode = 200;
  if (req.method === "POST") {
    // Process a POST request
    if (req.body.type === "like") {
      await addLike();
    } else if (req.body.type === "dislike") {
      await addDislike();
    }
    res.json({});
  } else {
    const votes = await getVotes();
    // Handle any other HTTP method
    res.json(votes);
  }
};
