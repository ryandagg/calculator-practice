import React from 'react';
import DisplayView from '../DisplayView';
import Keypad from '../KeypadView';
import CalculatorEngine from './CalculatorEngine';
import {compose, withState, withProps} from 'recompose';

const calculator = new CalculatorEngine();

const CalculatorView = (props) => {
    const {value, expression, ...restProps} = props;
    return (
        <div className="row">
            <div className="calculator col-md-5 mx-auto">
                <DisplayView value={value} expression={expression} />
                <Keypad {...restProps} />
            </div>
        </div>
    );
};

export default compose(
    withState('expression', 'setExpression', ''),
    withState('value', 'setValue', ''),
    withProps(({setExpression, setValue}) => ({
        updateProps:({value, expression}) => {
            setValue(value);
            setExpression(expression);
        },
    })),
    withProps(({updateProps}) => {
        return {
            onToggleSign: () => {
                updateProps(calculator.toggleSign());
            },
            onClear: () => {
                updateProps(calculator.clear());
            },
            onClearAll: () => {
                updateProps(calculator.clearAll());
            },
            onDecimalPoint: () => {
                updateProps(calculator.inputDecimal());
            },
            onDelete: () => {
                updateProps(calculator.delete());
            },
            onDigit(number) {
                updateProps(calculator.inputDigit(number));
            },
            onEquals: () => {
                updateProps(calculator.equals());
            },
            squareRoot: () => {
                updateProps(calculator.squareRoot());
            },
            percent: () => {
                updateProps(calculator.percent());
            },
            openParen: () => {
                updateProps(calculator.openParen());
            },
            closedParen: () => {
                updateProps(calculator.closedParen());
            },
            onOperator: (operator) => {
                updateProps(calculator.inputOperator(operator));
            },
        };
    })
)(CalculatorView);
