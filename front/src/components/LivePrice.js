import {Card, CardContent, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        boxSizing: "border-box",
        height: '15%',
        width: '10%',
        float: 'left',
        marginBottom: "25",
    }
})

export function LivePrice({name, price}) {
    console.log(`Name: ${name} and price: ${price}`)

    const classes = useStyles()

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography align="center" variant="h6" color="textPrimary">
                    {name}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography align="center" color="textSecondary">
                    {price.toFixed(4)}
                </Typography>
            </CardContent>
        </Card>
    )
}