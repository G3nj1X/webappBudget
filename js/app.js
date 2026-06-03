async function loadBudget() {

    const response =
        await fetch("./data/budget.json");

    const data =
        await response.json();

    render(data);
}

function render(data) {

    const budget = data.budget;

    const spent =
        data.expenses.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );

    const remaining =
        budget - spent;

    document.getElementById("budget")
        .textContent =
        budget.toFixed(2) + " €";

    document.getElementById("spent")
        .textContent =
        spent.toFixed(2) + " €";

    document.getElementById("remaining")
        .textContent =
        remaining.toFixed(2) + " €";

    const percentage =
        Math.min(
            (spent / budget) * 100,
            100
        );

    document.getElementById("progress")
        .style.width =
        percentage + "%";

    document.getElementById("progressText")
        .textContent =
        percentage.toFixed(1) +
        "% du budget utilisé";

    renderCategories(
        data.expenses
    );

    renderTable(
        data.expenses
    );
}

function renderCategories(expenses){

    const totals = {};

    expenses.forEach(expense => {

        totals[expense.category] =
            (totals[expense.category] || 0)
            + expense.amount;

    });

    const container =
        document.getElementById(
            "categories"
        );

    container.innerHTML =
        Object.entries(totals)
        .sort((a,b)=>b[1]-a[1])
        .map(([name, amount]) => `
            <div class="category-row">
                <span>${name}</span>
                <strong>${amount.toFixed(2)} €</strong>
            </div>
        `)
        .join("");
}

function renderTable(expenses){

    const table =
        document.getElementById(
            "expensesTable"
        );

    table.innerHTML =
        expenses
        .map(expense => `
            <tr>
                <td>${expense.label}</td>
                <td>${expense.category}</td>
                <td>${expense.amount.toFixed(2)} €</td>
            </tr>
        `)
        .join("");
}

loadBudget();