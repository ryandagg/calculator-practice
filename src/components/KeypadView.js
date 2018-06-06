/* globals document */
import React from 'react';
import PropTypes from 'prop-types';
import {compose, withProps, lifecycle} from 'recompose';

const KeypadView = (props) => {
    const {
        onDigit,
        onClearAll,
        onClear,
        onDelete,
        onOperator,
        onToggleSign,
        onDecimalPoint,
        onEquals,
        squareRoot,
        percent,
        closedParen,
        openParen,
    } = props;

    return (
        <div className="keypad">
            <div className="keypad-row">
                <button className="btn keypad-secondary-btn" value="clear-all" onClick={onClearAll}>
                    CE
                </button>
                <button className="btn keypad-secondary-btn" value="clear" onClick={onClear}>
                    C
                </button>
                <button className="btn keypad-secondary-btn" value="backspace" onClick={onDelete}>
                    ⌫
                </button>
                <button className="btn keypad-secondary-btn" value="/" onClick={onOperator}>
                    /
                </button>
            </div>
            <div className="keypad-row">
                <button className="btn keypad-primary-btn" value="7" onClick={onDigit}>
                    7
                </button>
                <button className="btn keypad-primary-btn" value="8" onClick={onDigit}>
                    8
                </button>
                <button className="btn keypad-primary-btn" value="9" onClick={onDigit}>
                    9
                </button>
                <button className="btn keypad-secondary-btn" value="*" onClick={onOperator}>
                    x
                </button>
            </div>
            <div className="keypad-row">
                <button className="btn keypad-primary-btn" value="4" onClick={onDigit}>
                    4
                </button>
                <button className="btn keypad-primary-btn" value="5" onClick={onDigit}>
                    5
                </button>
                <button className="btn keypad-primary-btn" value="6" onClick={onDigit}>
                    6
                </button>
                <button className="btn keypad-secondary-btn" value="-" onClick={onOperator}>
                    -
                </button>
            </div>
            <div className="keypad-row">
                <button className="btn keypad-primary-btn" value="1" onClick={onDigit}>
                    1
                </button>
                <button className="btn keypad-primary-btn" value="2" onClick={onDigit}>
                    2
                </button>
                <button className="btn keypad-primary-btn" value="3" onClick={onDigit}>
                    3
                </button>
                <button className="btn keypad-secondary-btn" value="+" onClick={onOperator}>
                    +
                </button>
            </div>
            <div className="keypad-row">
                <button className="btn keypad-secondary-btn" value="+-" onClick={onToggleSign}>
                    +/-
                </button>
                <button className="btn keypad-primary-btn" value="0" onClick={onDigit}>
                    0
                </button>
                <button className="btn keypad-secondary-btn" value="." onClick={onDecimalPoint}>
                    .
                </button>
                <button
                    className="btn keypad-secondary-btn"
                    style={{color: '#4CAF50'}}
                    value="="
                    onClick={onEquals}
                >
                    =
                </button>
            </div>
            <div className="keypad-row">
                <button className="btn keypad-secondary-btn"  onClick={percent}>
                    %
                </button>
                <button className="btn keypad-secondary-btn" onClick={squareRoot}>
                    √
                </button>
                <button className="btn keypad-secondary-btn" value="^" onClick={onOperator}>
                    ^
                </button>
                <button className="btn keypad-secondary-btn" value="0" onClick={openParen}>
                    (
                </button>
                <button className="btn keypad-secondary-btn" value="0" onClick={closedParen}>
                    )
                </button>
            </div>
        </div>
    );
};

KeypadView.propTypes = {
    onDigit: PropTypes.func.isRequired,
    onOperator: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEquals: PropTypes.func.isRequired,
    onDecimalPoint: PropTypes.func.isRequired,
    onToggleSign: PropTypes.func.isRequired,
    openParen: PropTypes.func.isRequired,
    closedParen: PropTypes.func.isRequired,
    percent: PropTypes.func.isRequired,
};

export default compose(
    withProps((props) => {
        const {
            onDigit,
            onOperator,
            onDecimalPoint,
            onDelete,
            onClearAll,
            onEquals,
            percent,
            closedParen,
            openParen,
        } = props;
        return {
            onDigit: ({target}) => onDigit(target.value),
            onOperator: ({target}) => onOperator(target.value),
            onKeyPress: (key) => {
                // console.log('key: ', key);
                switch (key) {
                    case '%':
                        percent();
                        break;
                    case '.':
                        onDecimalPoint();
                        break;
                    case '=':
                    case 'Enter':
                        onEquals();
                        break;
                    case 'c':
                        onClearAll();
                        break;
                    case 'Backspace':
                        onDelete();
                        break;
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        onDigit(key);
                        break;
                    case '+':
                    case '^':
                    case '-':
                    case '*':
                    case '/':
                        onOperator(key);
                        break;
                    case 'x':
                        onOperator('*');
                        break;
                    case '(':
                        openParen();
                        break;
                    case ')':
                        closedParen();
                        break;
                    default:
                        break;
                }
            },
        };
    }),
    lifecycle({
        componentDidMount() {
            document.addEventListener('keydown', ({key}) => this.props.onKeyPress(key), false);
        },
    })
)(KeypadView);
