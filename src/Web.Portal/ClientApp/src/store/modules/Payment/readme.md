
HttpGet
https://affiliate.188bet.green/Api/Payment/Info

Sample result

```
{
  "Amount": 0.0,
  "CommRcvOpt": null,
  "CommRcvList": [
    {
      "FieldName": "comm.rcv.field.bank.transfer",
      "Description": "Bank Transfer",
      "Support": true,
      "Data": [
        {
          "FieldName": "comm.rcv.data.field.bt.acc.name",
          "FieldValue": null,
          "Description": "Account Name"
        },
        {
          "FieldName": "comm.rcv.data.field.bt.acc.no",
          "FieldValue": null,
          "Description": "Account Number"
        },
        {
          "FieldName": "comm.rcv.data.field.bt.swift.code",
          "FieldValue": null,
          "Description": "SWIFT Code"
        },
        {
          "FieldName": "comm.rcv.data.field.bt.bank.name",
          "FieldValue": null,
          "Description": "Bank Name"
        },
        {
          "FieldName": "comm.rcv.data.field.bt.branch.name",
          "FieldValue": null,
          "Description": "Branch Name"
        },
        {
          "FieldName": "comm.rcv.data.field.bt.bank.country",
          "FieldValue": null,
          "Description": "Bank Country"
        },
        {
          "FieldName": "comm.rcv.data.field.bt.sort.code",
          "FieldValue": null,
          "Description": "Sort Code"
        },
        {
          "FieldName": "comm.rcv.data.field.bt.iban",
          "FieldValue": null,
          "Description": "IBAN"
        }
      ]
    },
    {
      "FieldName": "comm.rcv.field.moneybookers",
      "Description": "Moneybookers",
      "Support": true,
      "Data": [
        {
          "FieldName": "comm.rcv.data.field.moneybookers",
          "FieldValue": null,
          "Description": "Moneybookers Email"
        }
      ]
    },
    {
      "FieldName": "comm.rcv.field.188.account",
      "Description": "188Bet Account",
      "Support": true,
      "Data": [
        {
          "FieldName": "comm.rcv.data.field.188.account",
          "FieldValue": null,
          "Description": "188Bet Account"
        }
      ]
    },
    {
      "FieldName": "comm.rcv.field.neteller.account",
      "Description": "Neteller",
      "Support": true,
      "Data": [
        {
          "FieldName": "comm.rcv.data.field.neteller",
          "FieldValue": null,
          "Description": "Neteller Account/Email"
        }
      ]
    },
    {
      "FieldName": "comm.rcv.field.ecopayz.account",
      "Description": "ecoPayz",
      "Support": true,
      "Data": [
        {
          "FieldName": "comm.rcv.data.field.ecopayz.acc.name",
          "FieldValue": null,
          "Description": "ecoPayz Account Name"
        },
        {
          "FieldName": "comm.rcv.data.field.ecopayz.acc.no",
          "FieldValue": null,
          "Description": "ecoPayz Account No."
        }
      ]
    }
  ]
}
```

HttpPOST
https://affiliate.188bet.green/Api/Payment/Submit

Request
```
{
    "Amount": 0.0,
    "CommRcvOpt": "comm.rcv.field.188.account",
    "CommRcvList": [
        {
            "FieldName": "comm.rcv.field.bank.transfer",
            "Description": "????????????",
            "Support": true,
            "Data": [
                {
                    "FieldName": "comm.rcv.data.field.bt.acc.name",
                    "FieldValue": null,
                    "Description": "????????????"
                },
                {
                    "FieldName": "comm.rcv.data.field.bt.acc.no",
                    "FieldValue": null,
                    "Description": "????????????"
                },
                {
                    "FieldName": "comm.rcv.data.field.bt.swift.code",
                    "FieldValue": null,
                    "Description": "SWIFT Code"
                },
                {
                    "FieldName": "comm.rcv.data.field.bt.bank.name",
                    "FieldValue": null,
                    "Description": "????????????"
                },
                {
                    "FieldName": "comm.rcv.data.field.bt.branch.name",
                    "FieldValue": null,
                    "Description": "???/????????????"
                },
                {
                    "FieldName": "comm.rcv.data.field.bt.bank.country",
                    "FieldValue": null,
                    "Description": "??????????????????"
                },
                {
                    "FieldName": "comm.rcv.data.field.bt.sort.code",
                    "FieldValue": null,
                    "Description": "Sort Code"
                },
                {
                    "FieldName": "comm.rcv.data.field.bt.iban",
                    "FieldValue": null,
                    "Description": "IBAN"
                }
            ]
        },
        {
            "FieldName": "comm.rcv.field.moneybookers",
            "Description": "Moneybookers",
            "Support": true,
            "Data": [
                {
                    "FieldName": "comm.rcv.data.field.moneybookers",
                    "FieldValue": null,
                    "Description": "Moneybookers????????????"
                }
            ]
        },
        {
            "FieldName": "comm.rcv.field.188.account",
            "Description": "188BET ????????????",
            "Support": true,
            "Data": [
                {
                    "FieldName": "comm.rcv.data.field.188.account",
                    "FieldValue": "188Bet",
                    "Description": "188BET ????????????"
                }
            ]
        }
    ]
}
```

Response

```
{"Status":0,"Message":"????????????????????????","Params":null}
```