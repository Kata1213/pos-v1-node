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
    let freeGoodsObj = [];
    for(let item in obj){
        resultStr.push(printSingleItem(item,obj,freeGoodsObj));
        sum += calTotalSum(item,obj);
    }
    resultStr.push("---------------------")
    resultStr.push(`----------------------\n挥泪赠送商品:\n`);
    for(let x in freeGoodsObj){
        var itemDetailInfo =freeGoodsPriter(x);
        resultStr.push(`名称：${itemDetailInfo[0]["name"]}，数量：1${itemDetailInfo[0]["unit"]}\n`);
    }
    resultStr.push("---------------------")

        // var resultStrrr=[].concat(...resultStr); //不知道为什么，但是就是不行。
    var rrr=resultStr.join("");
    console.log(rrr);
}


function printSingleItem(item, obj,freeGoodsObj) {
    let allItems = database.loadAllItems();
    let itemDetailInfo =allItems.filter(function (subitem) {
        return subitem["barcode"] == item;
    })
    // console.log(itemDetailInfo);
    // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
    let goodsPrice = itemDetailInfo[0]["price"].toFixed(2);
    let amount=obj[item.split("-")[0]];
    //后来发现问题，这个price是打折之后的。
    let discoutInformation = database.loadPromotions();
    var newAmout=amount;
    var freeItem;
    if(discoutInformation[0]["barcodes"].indexOf(item)!=-1){
        newAmout=amount>2?amount-1:amount;
        freeGoodsObj[item]=1;
    }

    let everyGoodsSum =(goodsPrice * newAmout).toFixed(2);



    // console.log(goodsPrice);
    // console.log(amount);
    // console.log(everyGoodsSum);
    let resultSubStr =`名称：${itemDetailInfo[0]["name"]}，数量：${obj[item]}${itemDetailInfo[0]["unit"]}，单价：${goodsPrice}(元)，小计：${everyGoodsSum}(元)\n`;
    return resultSubStr;
}

function freeGoodsPriter(x) {
    let allItems = database.loadAllItems();
    let itemDetailInfo =allItems.filter(function (subitem) {
        return subitem["barcode"] === x;
    })
    return itemDetailInfo;
}

function calTotalSum(item, obj) {


}


module.exports = printInventory;