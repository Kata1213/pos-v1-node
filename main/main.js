let database = require("./datbase");



function printInventory(inputs) {
    var obj=[];
    inputs.map(function (item) {
        countElementNumber(item,obj);
    });
    printElements(obj);
};


function countElementNumber(item,obj){

    if(item.indexOf("-")!==-1){
        let element = item.split("-")[0];
        let count = item.split("-")[1]-'';//这里本来应该是'2'，减去''后变成了 2

        if(!obj[element]){
            obj[element] = count;
        }else{
            obj[element] += count;
        }
    }else{

        if(!obj[item]){
            obj[item] = 1;
        }else{
            obj[item] ++;
        }

    }
}


function printElements(obj) {
    var resultStr=[];
       resultStr.push("***<没钱赚商店>购物清单***\n");
    let sum = 0;
    for(let item in obj){
        resultStr.push(printSingleItem(item,obj));
        sum += calTotalSum(item,obj);
    }
    // var resultStrrr=[].concat(...resultStr); //不知道为什么，但是就是不行。
    var rrr=resultStr.join("");
    console.log(rrr);
}


function printSingleItem(item, obj) {
    let allItems = database.loadAllItems();
    let itemDetailInfo =allItems.filter(function (subitem) {
        return subitem["barcode"] == item;
    })
    // console.log(itemDetailInfo);
    // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
    let goodsPrice = itemDetailInfo[0]["price"].toFixed(2);
    let amount=obj[item.split("-")[0]];
    let everyGoodsSum =(goodsPrice * amount).toFixed(2);
    // console.log(goodsPrice);
    // console.log(amount);
    // console.log(everyGoodsSum);
    let resultSubStr =`名称：${itemDetailInfo[0]["name"]}，数量：${obj[item]}${itemDetailInfo[0]["unit"]}，单价：${goodsPrice}(元)，小计：${everyGoodsSum}(元)\n`;
    return resultSubStr;
}

function calTotalSum(item, obj) {


}


module.exports = printInventory;