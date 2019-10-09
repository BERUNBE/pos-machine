const index = require('../index');
const isAllBarcodesInDatabase = index.isAllBarcodesInDatabase;
const createReceipt = index.createReceipt;

it ('should return false when list includes invalid barcodes', () => {
    const purchaseList = ['0001', '1111'];
    let result = isAllBarcodesInDatabase(purchaseList);
    expect(result).toBe(false);
});

it ('should return true when given list of valid barcodes', () => {
    const purchaseList = ['0001', '0002'];
    let result = isAllBarcodesInDatabase(purchaseList);
    expect(result).toBe(true);
});

it ('should return error message when list includes invalid barcodes', () => {
    const purchaseList = ['0001', '1111'];
    let result = createReceipt(purchaseList);
    expect(result).toBe('[ERROR]:');
});

it ('should return receipt when given list of valid barcodes', () => {
    const purchaseList = ['0001', '0003', '0005', '0003'];
    let result = createReceipt(purchaseList);
    let expected =  'Receipts\n' +
                    '------------------------------------------------------------\n' +
                    'Coca Cola                       3          1\n' +
                    'Pepsi-Cola                      5          2\n' +
                    'Dr Pepper                       7          1\n' +
                    '------------------------------------------------------------\n' +
                    'Price: 20\n';
    expect(result).toBe(expected);
});