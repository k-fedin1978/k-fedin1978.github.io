const payFormData = new FormData(payForm)
const firstName = payFormData.get('firstName')
const middleName = payFormData.get('middleName')
const lastName = payFormData.get('lastName')
const phone = payFormData.get('phone')
const eml = payFormData.get('email')
const comment = payFormData.get('comment')
const chbx = document.getElementById('monthly')
const monthly = chbx.checked ? true : false


const btn = document.getElementById("checkout")

const widget = new cp.CloudPayments();

const launchWidget = () => {
  const intentParams = {
    publicTerminalId: "pk_305db2f56ee1392ea43aa62568664", // идентификатор терминала
    description: "Пожертвование", // описание списания
    paymentSchema: 'Single', // схема
    currency: "RUB", // валюта
    amount: 100, // сумма
    skin: "modern", //дизайн виджета (необязательно)
    cryptogramMode: false, // признак режима работы виджета. Если указано true - вместо проведения оплаты будет сформирована криптограмма карточных данных
    payerServiceFee: 50, // комиссия, оплачиваемая пользователем
    successRedirectUrl: "https://k-fedin1978.github.io",
    failRedirectUrl: "https://k-fedin1978.github.io",
    retryPayment: false,
    tokenize: true,
  };

  widget.start(intentParams).then(function(widgetResult) {
      console.log('result', widgetResult);
  }).catch(function(error) {
      console.log('error', error);
  });
}

btn.addEventListener('click', launchWidget)
