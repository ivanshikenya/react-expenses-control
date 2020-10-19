import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Buying, IBuying} from "./Buying";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        backgroundColor: "#f0f0f0"
    },
    sum: {
        marginTop: "5px"
    }
}));

type BuyingsListProps = {
    buyings: IBuying[];
    deleteHandler: Function
}

export const BuyingsList = ({buyings, deleteHandler}: BuyingsListProps) => {
    const classes = useStyles();
    const sum = buyings
        .map(buying => Number.parseFloat(buying.cost as any))
        .reduce((a, c) => a + c, 0);

    return <>
        {buyings.map((buying, index) => <Buying buying={buying} index={index} deleteHandler={deleteHandler}/>)}
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2" className={classes.sum}>
                    Сумма: {sum.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    </>;
}
