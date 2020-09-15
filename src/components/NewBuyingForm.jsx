import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
    form: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    root: {
        margin: theme.spacing(2),
    },
});

class NewBuyingFormUnwrapped extends React.Component {

    state = {
        name: '',
        cost: ''
    };

    handleSaveButton = () => {
        this.props.formHandler({
            name: this.state.name,
            cost: this.state.cost
        });
        this.setState({
            name: '',
            cost: ''
        });
    }

    render() {
        const { classes } = this.props;

        return <Card className={classes.root}><CardContent>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    value={this.state.name}
                    label="Название товара"
                    onChange={event => this.setState({name: event.target.value})}
                    inputProps={{ className: "buying-name" }}
                />
                <TextField
                    value={this.state.cost}
                    label="Цена"
                    onChange={event => this.setState({cost: event.target.value})}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    inputProps={{ className: "buying-cost" }}
                />
                <Button variant="contained" color="primary" onClick={this.handleSaveButton}>
                    Сохранить
                </Button>
            </form>
        </CardContent></Card>;
    }
}

NewBuyingFormUnwrapped.propTypes = {
    formHandler: PropTypes.func.isRequired,
};

export const NewBuyingForm = withStyles(styles)(NewBuyingFormUnwrapped);
