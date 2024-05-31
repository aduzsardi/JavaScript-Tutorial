const transactionsEl = document.querySelector('.transactions');
const balanceNumberEl = document.querySelector('.balance-number');
const numberIncomeEl = document.querySelector('.number--income');
const numberExpensesEl = document.querySelector('.number--expenses');
const formEl = document.querySelector('.form');
const inputDescriptionEl = document.querySelector('.input--description');
const inputAmountEl = document.querySelector('.input--amount');


const calculateBalace = () => {
    const income = numberIncomeEl.textContent;
    const expenses = numberExpensesEl.textContent;
    const balance = Number(income) - Number(expenses);
    balanceNumberEl.textContent = balance;
    if (balance < 0) {
        balanceNumberEl.style.color = 'red';
    }
}

const calculateExpenses = (amount, eventType) => {
    const currentExpenses = numberExpensesEl.textContent;
    const expense = eventType == 'submit' ? Number(amount * -1) : Number(amount);
    numberExpensesEl.textContent = Number(currentExpenses) + expense;
}

const calculateIncome = (amount, eventType) => {
    const currentIncome = numberIncomeEl.textContent;
    const income = eventType == 'submit' ? Number(amount) : Number(amount * -1);
    numberIncomeEl.textContent = Number(currentIncome) + income;
}

const submitHandler = (event) => {
    event.preventDefault();
    const eventType = event.type;

    const description = inputDescriptionEl.value;
    const amount = inputAmountEl.value;
    if (amount < 0) {
        var calculator = calculateExpenses;
        var liType = 'expense';
        var sign = '';
    } else {
        var calculator = calculateIncome;
        var liType = 'income';
        var sign = '+'
    }

    const transactionItemHTML = `
        <li class="transaction transaction--${liType}">
            <span class="transaction__text">${description}</span>
            <span class="transaction__amount">${sign}${amount}</span>
            <button class="transaction__btn">X</button>
        </li>`;
    transactionsEl.insertAdjacentHTML('beforeend', transactionItemHTML);
    inputAmountEl.value = '';
    inputDescriptionEl.value = '';
    calculator(amount, eventType);
    calculateBalace();
}

const clickHandler = (event) => {
    const clickedEl = event.target.parentNode;
    const eventType = event.type;
    clickedEl.remove();

    const amountEl = clickedEl.querySelector('.transaction__amount');
    const amount = +amountEl.textContent;
    amount > 0 ? calculateIncome(amount, eventType) : calculateExpenses(amount,eventType);
    calculateBalace();
}

formEl.addEventListener('submit', submitHandler);

transactionsEl.addEventListener('click', clickHandler);
