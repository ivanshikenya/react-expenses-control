import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IBuying } from './Buying';

interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
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


type NewBuyingFormType = {
    formHandler: Function;
}

export const NewBuyingForm: React.FC<NewBuyingFormType> = ({ formHandler }: NewBuyingFormType) => {

    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);


    const handleSaveButton = () => {
        formHandler({
            name: name,
            cost: cost
        });
        setName('');
        setCost(0);
    }



    return <Card><CardContent>
        <form noValidate autoComplete="off">
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
                    inputComponent: NumberFormatCustom as any,
                }}
                inputProps={{ className: "buying-cost" }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveButton}>
                Сохранить
            </Button>
        </form>
    </CardContent></Card>;
};
