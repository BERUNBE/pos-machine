const productDatabase = [
    {"id": "0001", "name" : "Coca Cola", "price": 3},
    {"id": "0002", "name" : "Diet Coke", "price": 4},
    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
    {"id": "0004", "name" : "Mountain Dew", "price": 6},
    {"id": "0005", "name" : "Dr Pepper", "price": 7},
    {"id": "0006", "name" : "Sprite", "price": 8},
    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
    {"id": "0010", "name" : "Fanta", "price": 12}
];

function isAllBarcodesInDatabase(purchaseList) {
    let allValid = true;
    let barcodesInDatabase = productDatabase.map(product => product.id);
    for (let i=0; i<purchaseList.length; i++) {
        if (!barcodesInDatabase.includes(purchaseList[i])){
            allValid = false;
        }
    }
    return allValid;
}

function createReceipt(purchaseList) {
    if (!isAllBarcodesInDatabase(purchaseList)) {
        return null;  
    } 
    
    let receipt =   'Receipts\n' +
                    '------------------------------------------------------------\n';
    const uniqueBarcodesInPurchaseList = purchaseList.filter((item, i, list) => list.indexOf(item) == i);
    let totalPrice = 0;
    for (let barcode of uniqueBarcodesInPurchaseList) {  
        let item = productDatabase.filter(product => product.id == barcode)[0];
        let itemQuantity = purchaseList.filter(barcode => barcode == item.id).length;
        let spaces1 = ' '.repeat(32 - item.name.length);
        let spaces2 = ' '.repeat(11 - item.price.toString().length);
        receipt += item.name + spaces1 + item.price + spaces2 + itemQuantity + '\n';
        totalPrice += itemQuantity * item.price;
    }
    receipt +=  '------------------------------------------------------------\n' +
                'Price: ' + totalPrice + '\n';
    return receipt;
}

module.exports = {
    isAllBarcodesInDatabase,
    createReceipt
}