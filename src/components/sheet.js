import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  headerCell: {
    width: 200,
    alignItems: "center",
    display: "inline-block",
    height: 30,
  },
  cell: {
    width: 170,
    marginRight: 30,
  },
  cellResult: {
    display: "inline-block",
    width: 170,
  },
  row: {
    marginBottom: 10,
  },
});

export default function Sheet() {
  const classes = useStyles();
  const [data, setData] = useState([
    { a: 0, b: 0 },
    { a: 0, b: 0 },
  ]);

  const getTotal = (row) => {
    if (isNaN(row.a) || isNaN(row.b)) {
      return "invalid!";
    }
    return +row.a + +row.b;
  };

  const updateCell = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const addRow = () => {
    setData([...data, { a: 0, b: 0 }]);
  };

  const deleteRow = (deletedIndex) => {
    const newData = data.filter((value, index) => index !== deletedIndex);
    setData(newData);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Sheet
        </Typography>
        <div className={classes.row}>
          <span className={classes.headerCell}>a</span>
          <span className={classes.headerCell}>b</span>
          <span className={classes.headerCell}>a+b</span>
          <span className={classes.headerCell}></span>
        </div>
        {data.map((row, index) => (
          <div className={classes.row} key={index}>
            <input
              className={classes.cell}
              value={row.a}
              onChange={(e) => updateCell(index, "a", e.target.value)}
            />
            <input
              className={classes.cell}
              value={row.b}
              onChange={(e) => updateCell(index, "b", e.target.value)}
            />
            <span className={classes.cellResult}>{getTotal(row)}</span>
            <Button
              onClick={() => deleteRow(index)}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </div>
        ))}
      </CardContent>
      <CardActions>
        <Button onClick={addRow} variant="contained" color="primary">
          Add row
        </Button>
      </CardActions>
    </Card>
  );
}
