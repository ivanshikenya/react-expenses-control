import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

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

export const NewBuyingForm= ({formHandler}) => {
    const[name, setName] = useState('');
    const[cost, setCost] = useState(0);
    const classes = useStyles();

    function handleSaveButton(){
        formHandler({
            name: name,
            cost: cost
        });
        setName('');
        setCost(0)
    };

        return <Card className={classes.root}><CardContent>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    value={name}
                    label="Название товара"
                    onChange={event => setName(event.target.value)}
                    inputProps={{ className: "buying-name" }}
                />
                <TextField
                    value={cost}
                    label="Цена"
                    onChange={event => setCost(Number(event.target.value))}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    inputProps={{ className: "buying-cost" }}
                />
                <Button variant="contained" color="primary" onClick={handleSaveButton}>
                    Сохранить
                </Button>
            </form>
        </CardContent></Card>;
    }

NewBuyingForm.propTypes = {
    formHandler: PropTypes.func.isRequired,
};
