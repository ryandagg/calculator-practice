const openParen = '(';
const closedParen = ')';
const operators = [
    {key: '^', operation: (a, b) => a ** b},
    {key: '*', operation: (a, b) => a * b},
    {key: '/', operation: (a, b) => a / b},
    {key: '+', operation: (a, b) => a + b},
    {key: '-', operation: (a, b) => a - b},
];

export const operatorsMap = operators.reduce((result, {key}) => {
    result[key] = true;
    return result;
}, {});

const getLastClose = (register) => {
    for (let x = register.length; x > 0, x--;) {
        if (register[x] === closedParen) return x;
    }
    return -1;
};

const handleParens = (register) => {
    const openIndex = register.indexOf(openParen);
    if (openIndex > -1) {
        const lastClose = getLastClose(register);
        //check for empty parens
        if ((openIndex + 1) !== lastClose) {
            // build new array that eliminates the parens. thar be recursion here
            // hurray for hoisting
            register = [
                ...register.slice(0, openIndex),
                equalTheThings(register.slice(openIndex + 1, lastClose)), // eslint-disable-line no-use-before-define
                ...register.slice(lastClose + 1, register.length),
            ];
        } else {
            // simply remove empty parens
            // be careful that we handle unclosed parens
            const toRemoveIndex = lastClose > -1 ? lastClose : openIndex;
            register = [
                ...register.slice(0, openIndex),
                ...register.slice(toRemoveIndex + 1, register.length),
            ];
        }
    }
    return register;
};

export const equalTheThings = (register) => {

    register = handleParens(register);

    let nextOperation;
    let newRegister = [];
    operators.forEach(({key, operation}) => {
        register.forEach(value => {
            if (key === value) {
                nextOperation = operation;
            } else if (nextOperation) {
                // overwrite the last element of newRegister with calculation
                const lastIndex = newRegister.length - 1;
                newRegister[lastIndex] = nextOperation(+newRegister[lastIndex], +value);
                nextOperation = null;
            } else {
                newRegister.push(value);
            }
        });
        register = newRegister;
        newRegister = [];
    });

    if (register.length > 1) {
        throw new Error(`logic is wrong: ${register}`);
    }

    return register[0];


};
