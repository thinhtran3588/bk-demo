import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: { marginTop: 10 },
});

export default function Votes() {
  const classes = useStyles();
  const [votes, setVotes] = useState({ likes: 0, dislikes: 0 });

  const refreshVotes = async () => {
    const result = await fetch("/api/votes");
    const voteResult = await result.json();
    setVotes(voteResult);
  };

  useEffect(() => {
    const interval = setInterval(refreshVotes, 2000);
    refreshVotes();
    return () => {
      clearInterval(interval);
    };
  }, []);

  const like = async () => {
    await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "like" }),
    });
    refreshVotes();
  };

  const dislike = async () => {
    await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "dislike" }),
    });
    refreshVotes();
  };

  return (
    <Card className={classes.root} elevation={8}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Votes
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={like} variant="contained" color="primary">
          Like ({votes.likes})
        </Button>
        <Button onClick={dislike} variant="contained" color="secondary">
          Dislike ({votes.dislikes})
        </Button>
      </CardActions>
    </Card>
  );
}
