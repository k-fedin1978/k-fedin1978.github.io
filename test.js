payForm.onsubmit = (event) => {
    event.preventDefault()
    const payFormData = new FormData(payForm)
    const firstName = payFormData.get('firstName')
    const middleName = payFormData.get('middleName')
    const lastName = payFormData.get('lastName')
    const phone = payFormData.get('phone')
    const eml = payFormData.get('email')
    const comment = payFormData.get('comment')
    const chbx = document.getElementById('monthly')
    const monthly = chbx.checked ? true : false

    var widget = new cp.CloudPayments();
    var data = {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        birth: '',
        address: '',
        street: '',
        city: '',
        country: '',
        phone: phone,
        postcode: '',
        comment: comment,
        culture: 'en-US'

    };
    var receipt = {
        Items: [//товарные позиции
            {
                label: 'Подписка Premium+ {Профи}', //то что в фигурных скобках брать из поля name выбранного тарифа
                price: 100.00, //цена (брать из тарифа)
                quantity: 1.00, //всегда 1
                amount: 100.00, //сумма (также брать из тарифа)
                vat: null, //ставка НДС
                method: 0, // тег-1214 признак способа расчета - признак способа расчета
                object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
            }
        ],
        taxationSystem: 0, //система налогообложения; необязательный, если у вас одна система налогообложения
        email: 'user@example.com', //e-mail покупателя (берем от юзера)
        phone: '', //телефон покупателя (берем из юзера)
        isBso: false, //чек является бланком строгой отчетности
        amounts: {
            electronic: 100.00, // Сумма оплаты (берем из тарифа)
            advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
            credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после запятой)
            provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
        }
    };

    if (monthly) {
        data.CloudPayments = {
            CustomerReceipt: receipt,
            recurrent: {
                interval: 'Month',
                period: 1,
                CustomerReceipt: receipt
            }
        }
    }
    widget.pay('charge',
        {
            publicId: 'pk_305db2f56ee1392ea43aa62568664', //id из личного кабинета
            description: comment, //назначение
            amount: 100, //сумма
            currency: 'RUB', //валюта
            accountId: eml, //идентификатор плательщика (необязательно)
            invoiceId: '123456', //номер заказа  (необязательно)
            // email: eml, //email плательщика (необязательно)
            requireEmail: false,
            disableEmail: true,
            skin: "mini", //дизайн виджета (необязательно)
            autoClose: '', //время в секундах до авто-закрытия виджета (необязательный)
            // data: data,
            configuration: {
                common: {
                    // successRedirectUrl: "https://{ваш сайт}/success", // адреса для перенаправления 
                    //  failRedirectUrl: "https://{ваш сайт}/fail"        // при оплате по T-Pay
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
                if (monthly) {

                    widget.charge({ // options
                        publicId: 'pk_305db2f56ee1392ea43aa62568664', //id из личного кабинета
                        description: 'Подписка на ежемесячные пожертвования', //назначение
                        amount: 100, //сумма
                        currency: 'RUB', //валюта
                        invoiceId: '1234567', //номер заказа  (необязательно)
                        accountId: eml, //идентификатор плательщика (обязательно для создания подписки)
                        data: data
                    },
                        function (options) { // success
                            //действие при успешной оплате
                        },
                        function (reason, options) { // fail
                            //действие при неуспешной оплате
                        });
                }
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









