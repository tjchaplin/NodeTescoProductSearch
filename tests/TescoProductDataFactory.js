var should = require('should');
var sampleData = require('./SampleTescoProductData');
var productDataFactory = require('../server/Factories/TescoProductDataFactory');

describe('Product Search',function(){
    it("Should get result pagination results",function(){
        var searchView = productDataFactory.getProductSearchView(sampleData);
        searchView.startIndex.should.be.greaterThan(-1)
        searchView.totalItems.should.be.greaterThan(0)
        searchView.currentItemCount.should.be.greaterThan(0)
    })
});


describe('Product Search',function(){
    it("Should get each products gtin",function(){
        var searchView = productDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.gtin.length.should.be.greaterThan(0);
        }
    })
});

describe('Product Search',function(){
    it("Should get each products name",function(){
        var searchView = productDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.name.length.should.be.greaterThan(0);
        }
    })
});

describe('Product Search',function(){
    it("Should get each products image",function(){
        var searchView = productDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.image.length.should.be.greaterThan(0);
        }
    })
});


describe('Product Search',function(){
    it("Should get each product id",function(){
        var searchView = productDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.productId.length.should.be.greaterThan(0);
        }
    })
});


describe('Product Search',function(){
    it("Should get each base product id",function(){
        var searchView = productDataFactory.getProductSearchView(sampleData);
        for(var i = 0; i < searchView.products.length; i++)
        {
            var productItem = searchView.products[i];
            productItem.baseProductId.length.should.be.greaterThan(0);
        }
    })
});
