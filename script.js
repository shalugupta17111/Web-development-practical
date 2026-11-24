
let expenses = [];

const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");
const filterCategory = document.getElementById("filterCategory");

// Add Expense
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    // Validation
    if (name === "" || amountInput.value.trim() === "" ||
        category === "") {
        alert("Please fill all the fields!");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid positive amount!");
        return;
    }

    const expense = {
        id: Date.now() + Math.random(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    form.reset();

    displayExpenses();
});

// Display Expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    const selectedCategory = filterCategory.value;

    const filteredExpenses = expenses.filter(function(expense) {
        return selectedCategory === "All" ||
               expense.category === selectedCategory;
    });

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML =
            '<p class="empty-message">No expenses found!</p>';
    }

    filteredExpenses.forEach(function(expense) {

        const item = document.createElement("div");
        item.className = "expense-item";

        const info = document.createElement("div");
        info.className = "expense-info";

        const title = document.createElement("h3");
        title.textContent = expense.name;

        const category = document.createElement("p");
        category.textContent = "Category: " + expense.category;

        const amount = document.createElement("p");
        amount.className = "amount";
        amount.textContent = "₹" + expense.amount.toFixed(2);

        info.appendChild(title);
        info.appendChild(category);
        info.appendChild(amount);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            deleteExpense(expense.id);
        });

        item.appendChild(info);
        item.appendChild(deleteBtn);

        expenseList.appendChild(item);

    });

    updateTotal();
}

// Calculate Total
function updateTotal() {

    const total = expenses.reduce(function(sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalDisplay.textContent = "₹" + total.toFixed(2);
}

function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
}

// Category Filter
filterCategory.addEventListener("change", function() {
    displayExpenses();
});
