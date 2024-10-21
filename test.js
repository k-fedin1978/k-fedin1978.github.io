payForm.onsubmit = (event) => {
    event.preventDefault()
    const payFormData = new FormData(payForm)
    const firstName = payFormData.get('firstName')
    const middleName = payFormData.get('middleName')
    const lastName = payFormData.get('lastName')
    const phone = payFormData.get('phone')
    const email = payFormData.get('email')
    const comment = payFormData.get('comment')
    const chbx = document.getElementById('monthly')
    const monthly = chbx.checked ? true : false

    var widget = new cp.CloudPayments();
    widget.pay('charge',
        {
            publicId: 'pk_aff17de359b486f45c12b4e4fdab0', //id из личного кабинета
            description: comment, //назначение
            amount: 100, //сумма
            currency: 'RUB', //валюта
            accountId: email, //идентификатор плательщика (необязательно)
            invoiceId: '', //номер заказа  (необязательно)
            email: email, //email плательщика (необязательно)
            skin: "mini", //дизайн виджета (необязательно)
            autoClose: '', //время в секундах до авто-закрытия виджета (необязательный)
            data: {
                // myProp: 'myProp value'
            },
            configuration: {
                common: {
                    // successRedirectUrl: "https://{ваш сайт}/success", // адреса для перенаправления 
                    // failRedirectUrl: "https://{ваш сайт}/fail"        // при оплате по T-Pay
                }
            },
            payer: {
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                birth: '',
                address: '',
                street: '',
                city: '',
                country: '',
                phone: phone,
                postcode: ''
            }
        },
        {
            onSuccess: function (options) { // success
                //действие при успешной оплате
            },
            onFail: function (reason, options) { // fail
                //действие при неуспешной оплате
            },
            onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                //например вызов вашей аналитики
            }
        }
    )
}