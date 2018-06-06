import {equalTheThings, operatorsMap} from './CalculatorUtils';

class CalculatorEngine {
    constructor() {
        this.register = [];
        this.currentValue = '';
        this.result = '';
        this.openParenCount = 0;
    }

    isLastCloseParen() {
        return this.register[this.register.length - 1] === ')';

    }

    isLastOpenParen() {
        return this.register[this.register.length - 1] === '(';
    }

    allowOperator() {
        return this.currentValue === '' && !this.isLastCloseParen();
    }

    isLastAnOperator() {
        return !!operatorsMap[this.register[this.register.length - 1]];
    }

    getExpression() {
        return this.register.join(' ');
    }

    returnCurrent() {
        return {
            expression: this.getExpression(),
            value: this.currentValue,
        };
    }

    inputDigit(digit) {
        if (isNaN(digit)) {
            return this.returnCurrent();
        }

        if (this.result !== '') {
            this.result = '';
            this.currentValue = '';
        }

        this.currentValue += digit;

        return this.returnCurrent();
    }

    inputOperator(operator) {
        if (this.allowOperator()) return this.returnCurrent();

        this.register.push(this.currentValue);
        this.register.push(operator);

        this.currentValue = '';

        return this.returnCurrent();
    }

    inputDecimal() {
        if (this.result !== '') {
            this.result = '';
            this.currentValue = '';
        }

        if (this.currentValue.indexOf('.') >= 0) {
            return;
        }

        if (this.currentValue === '') {
            this.currentValue += '0.';
        } else {
            this.currentValue += '.';
        }

        return this.returnCurrent();
    }

    clear() {
        this.currentValue = '';

        return this.returnCurrent();
    }

    clearAll() {
        this.currentValue = '';
        this.register = [];
        this.result = '';

        return this.returnCurrent();
    }

    delete() {
        if (this.currentValue === '') {
            let lastNumber = 0;
            for (let x = this.register.length - 1; x > 0; x--) {
                if (!operatorsMap[this.register[x]]) {
                    lastNumber = x;
                    break;
                }
            }

            this.register = this.register.slice(0, lastNumber);
        }

        this.currentValue = this.currentValue.substring(0, this.currentValue.length - 1);

        return this.returnCurrent();
    }

    equals() {
        if (this.currentValue === '' && !this.isLastCloseParen()) return this.returnCurrent();

        if (this.currentValue !== '') this.register.push(this.currentValue);

        // close the parens
        if (this.openParenCount) {
            this.register = [...this.register, ...Array.apply(null, {length: this.openParenCount}).map(() => ')')];
        }
        this.result = equalTheThings(this.register);
        this.currentValue = this.result.toString();
        this.register = [];
        this.openParenCount = 0;

        return this.returnCurrent();
    }

    toggleSign() {
        if (this.currentValue === '') return this.returnCurrent();

        this.currentValue = (parseFloat(this.currentValue) * -1).toString();
        return this.returnCurrent();
    }

    squareRoot() {
        if (this.currentValue === '') return this.returnCurrent();

        this.currentValue = Math.sqrt(parseFloat(this.currentValue)).toString();
        return this.returnCurrent();
    }

    percent() {
        if (this.currentValue === '') return this.returnCurrent();

        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        return this.returnCurrent();
    }

    openParen() {
        if (this.currentValue !== '') {
            this.register.push(this.currentValue);
            this.register.push('*');
        }


        this.register.push('(');
        this.openParenCount++;
        this.currentValue = '';

        return this.returnCurrent();
    }

    closedParen() {
        const disallowClose = this.currentValue === '' && this.isLastAnOperator();
        if (this.openParenCount <= 0 || disallowClose) {
            return this.returnCurrent();
        }

        if (this.isLastOpenParen()) {
            this.register.pop();
        } else {
            this.register.push(this.currentValue);
            this.register.push(')');
        }

        this.openParenCount--;

        this.currentValue = '';
        return this.returnCurrent();
    }
}

export default CalculatorEngine;
