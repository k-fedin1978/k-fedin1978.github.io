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
                label: 'Пожертвование',
                price: 100.00,
                quantity: 1.00,
                amount: 100.00,
                vat: null,
                method: 0,
                object: 0,
            }
        ],
        taxationSystem: 0,
        email: eml,
        phone: phone,
        isBso: false,
        amounts: {
            electronic: 100.00,
            advancePayment: 0.00,
            credit: 0.00,
            provision: 0.00
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
            publicId: 'pk_305db2f56ee1392ea43aa62568664',
            description: comment,
            amount: 100,
            currency: 'RUB',
            accountId: eml,
            invoiceId: '123456',
            email: eml,
            requireEmail: false,
            disableEmail: true,
            skin: "mini",
            data: data,
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
            onSuccess: function (options) {
                console.log("Payment Success!")
                if (monthly) {
                    widget.charge({
                        publicId: 'pk_305db2f56ee1392ea43aa62568664',
                        description: 'Подписка на ежемесячные пожертвования',
                        amount: 100,
                        currency: 'RUB',
                        invoiceId: '1234567',
                        accountId: eml,
                        data: data
                    },
                        function (options) {
                            console.log("Subscription Success!")
                        },
                        function (reason, options) {
                            condole.log("Subscription Failed!")
                        });
                }
            },
            onFail: function (reason, options) {
                condole.log("Payment Failed!")
            },
            onComplete: function (paymentResult, options) {
                console.log("Payment Complete!")
            }
        }
    )
}

