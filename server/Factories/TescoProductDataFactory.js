module.exports.getProductSearchView = function (productSearchResult){
    var view = {};
    view.startIndex = productSearchResult.PageNumber;
    view.totalItems = productSearchResult.TotalProductCount;
    view.currentItemCount = productSearchResult.PageProductCount;
    view.products = getProductData(productSearchResult.Products);

    return view;

};

var getProductData = function(productData)
{
    //console.log(JSON.stringify(productData));
    var resultProductData = [];
    for(var i = 0; i< productData.length; i++)
    {
        var productItem = getProductItem(productData[i]);
        resultProductData.push(productItem);
    }

    return resultProductData;
};


var getProductItem = function (productItem)
{
    console.log('OrigProductItem:'+productItem);

    var resultProductItem = {};
    resultProductItem.baseProductId = productItem.BaseProductId;
    resultProductItem.productId = productItem.ProductId
    resultProductItem.gtin = productItem.EANBarcode;
    resultProductItem.name = productItem.Name;
    resultProductItem.image = productItem.ImagePath;

    console.log('ResultProductItem:'+resultProductItem);
    return resultProductItem;
}
