

export const fakeData = {
  accountNumber: 'A1234567',
  account: {
    customer: {
      "accountList": [{
        "accSuffix": "S",
        "accountName": "Felix Exitoso",
        "fmuCode": 'U',
        "classificationsList": [{
          "classificationUnitCode": "51250",
          "classificationUnitDescription": "This includes takeaway outlets selling cooked and ready-to-eat chicken.",
          "levyYear": "1 April 2015 - 31 March 2016"
        }]
      }]
    },
    bicHost: 'https://api-stage.businessdescription.co.nz/api/'
  },
  customer: {
    "type": "Person",
    "accountList": [
      {
        "accountNumber": "A1234567S",
        "accNumber": "A1234567",
        "accSuffix": "S",
        "accountName": "Felix Exitoso",
        "fmuCode": "F",
        "balance": null,
        "classificationsList": [
          {
            "accountNumber": "A1234567S",
            "classificationUnitCode": "57200",
            "classificationUnitDescription": "Pubs, taverns, and bars",
            "levyYear": "1 April 2015 - 31 March 2016"
          }
        ]
      }
    ],
    "accountNumber": "A1234567",
    "address": null,
    "contactDetails": null,
    "dob": null,
    "firstName": "Felix",
    "gender": null,
    "lastName": "Exitoso",
    "middleName": null,
    "name": "Felix Exitoso",
    "suffixes": [],
    "title": null
  },
  searchResults: [
    {
        "code": "A052903",
        "desc": "Aerial crop dusting or spraying",
        "keywords": [
          "agricultural spraying",
          "chemical spraying"
        ],
        "definition": "<p>This includes pilots operating under Civil Aviation Rules Part 137.</p>",
        "definitionPlainText": "This includes pilots operating under Civil Aviation Rules Part 137.",
        "important": "",
        "lastUpdateDate": "2015-08-04T23:51:01.344Z",
        "id": "555c7ba67aaceec91e3f245e",
        "cuId": "555b1da725a9732ca20a1028",
        "anzsicId": "555b206c25a9732ca20a1268",
        "lastUpdateUserId": "55624ea8f0529345d1e61d82",
        "classId": "555bc5e225a9732ca20a1007",
        "cu": {
          "code": "02130",
          "desc": "Air operations under Civil Aviation Rules Part 137",
          "id": "555b1da725a9732ca20a1028"
        },
        "anzsic": {
          "code": "A052900",
          "desc": "Other Agriculture and Fishing Support Services",
          "id": "555b206c25a9732ca20a1268"
        },
        "bicrefs": [
          {
            "desc": "You can also use #$0 or #$1",
            "order": 0,
            "integrated": false,
            "refs": [
              {
                "id": "555c7ba67aaceec91e3f2466",
                "type": "bic",
                "desc": "A052930 Crop dusting service - aerial"
              },
              {
                "id": "555c7ba67aaceec91e3f246c",
                "type": "bic",
                "desc": "A052950 Fertiliser spreading - aerial"
              }
            ],
            "id": "5570c3152c8535844998d37c",
            "bicId": "555c7ba67aaceec91e3f245e",
            "allRefsFoundDesc": true
          }
        ]
    }]
};
