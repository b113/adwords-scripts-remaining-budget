function main() {

    var alertLimit = 1000; // Минимальный остаток для отправки уведомления
    var email = ['your_email@gmail.com']; //Добавляются адреса всех, кому должно прийти письмо с уведомлением

    var budgetOrder = AdWordsApp.budgetOrders().get().next();
    var SpendingLimit = budgetOrder.getSpendingLimit(); 
    var Spent = AdWordsApp.currentAccount().getStatsFor('ALL_TIME').getCost(); 
    var remainingBudget = SpendingLimit - Spent;

    Logger.log("Остаток аккаунта: " + Math.round(remainingBudget));

    if (remainingBudget < alertLimit) {
        sendSimpleTextEmail(email);
    }

    function sendSimpleTextEmail(mail) {
        MailApp.sendEmail(mail,
            'Минимальный остаток бюджета в AdWords: ' + AdWordsApp.currentAccount().getName(),
            'В аккаунте заканчиваются средства. Внесите оплату!');
    }
}

// за основу взят https://goo.gl/h88iJP