import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            suffix="р"
        />
    );
}


const useStyles = makeStyles((theme) => ({
    form: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    root: {
        margin: theme.spacing(2),
    },
}));

type NewBuyingFormProps = {
    formHandler: Function;
}

export const NewBuyingForm = ({formHandler}: NewBuyingFormProps) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    function handleSaveButton() {
        formHandler({
            name,
            cost
        });
        setName('');
        setCost('');
    }

    return <Card className={classes.root}><CardContent>
        <form className={classes.form} noValidate autoComplete="off">
            <TextField
                value={name}
                label="Название товара"
                onChange={event => setName(event.target.value)}
            />
            <TextField
                value={cost}
                label="Цена"
                onChange={event => setCost(event.target.value)}
                InputProps={{
                    inputComponent: NumberFormatCustom as any,
                }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveButton}>
                Сохранить
            </Button>
        </form>
    </CardContent></Card>;
}
