// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let votes = { likes: 3, dislikes: 5 };

const addLike = () => {
  votes.likes++;
};

const addDislike = () => {
  votes.dislikes++;
};

export default (req, res) => {
  res.statusCode = 200;
  if (req.method === "POST") {
    // Process a POST request
    if (req.body.type === "like") {
      addLike();
    } else if (req.body.type === "dislike") {
      addDislike();
    }
    res.json({});
  } else {
    // Handle any other HTTP method
    res.json(votes);
  }
};
