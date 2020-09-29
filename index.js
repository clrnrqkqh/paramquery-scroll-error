
$(function () {

      var colM = [
            { title: "Order ID", width: 200, dataIndx: "OrderID" },
            { title: "Customer Name", width: 130, dataIndx: "CustomerName" },
            { title: "Product Name", width: 190, dataIndx: "ProductName" },
            { title: "Unit Price", width: 100, dataIndx: "UnitPrice", align: "right" },
            { title: "Quantity", width: 100, dataIndx: "Quantity", align: "right" },
            { title: "Order Date", width: 100, dataIndx: "OrderDate" },
            { title: "Required Date", width: 100, dataIndx: "RequiredDate" },
            { title: "Shipped Date", width: 100, dataIndx: "ShippedDate" },
            { title: "ShipCountry", width: 100, dataIndx: "ShipCountry" },
            { title: "Freight", width: 100, align: "right", dataIndx: "Freight" },
            { title: "Shipping Name", width: 120, dataIndx: "ShipName" },
            { title: "Shipping Address", width: 180, dataIndx: "ShipAddress" },
            { title: "Shipping City", width: 100, dataIndx: "ShipCity" },
            { title: "Shipping Region", width: 110, dataIndx: "ShipRegion" },
            { title: "Shipping Postal Code", width: 130, dataIndx: "ShipPostalCode" }
		];
        var dataModel = {
            location: "remote",            
            dataType: "JSON",
            method: "GET",
            url: "https://paramquery.com/pro/invoice/get"
            //url: "/invoice.php", //for PHP
        }
        var pageModel = { 
            type: "local", 
            rPP: 20, strRpp: "{0}", 

            //customize localization strings.
            strDisplay: "{0} to {1} of {2}",
            strPage: "Page {0} / {1}",
                 
            layout: ['first','prev', 'next','last', "|", "strPage"]                
        }   
        var grid1 = $("div#grid_paging").pqGrid({
            width: "100%-25",
            height: "100%-255",
            freezeCols: 2,            
            wrap: true,
            showTitle: false,
            collapsible: false,            
            pageModel: pageModel,                      
            toolbar: {
                cls: 'pq-toolbar',
                items: [
                    {
                        type: 'button',
                        label: "Custom layout",
                        listener: function() {
                            //debugger;
                            //this.pager().destroy();
                            this.option('pageModel.layout',['strDisplay', '|',"strPage", "|", "first","prev","next","last"])
                            this.refresh();
                        }
                    },
                    {
                        type: 'button',
                        label: "Default layout",
                        listener: function() {
                            //debugger;
                            //this.pager().destroy();
                            this.option('pageModel.layout',$.paramquery.pqPager.defaults.layout)
                            this.refresh();
                        }
                    },
                    { type: 'separator'},
                    {
                        type: 'select',
                        cls:'rpp',
                        label: "Rpp: ",
                        value: pageModel.rPP,
                        options: [10, 20, 50, 100, 1000],
                        listener: function(evt) {
                            this.option('pageModel.rPP', $(evt.target).val())
                            this.refreshDataAndView();
                        }
                    },
                    {
                        type: 'textbox',
                        cls: 'curpage',
                        label: "Page No: ",
                        listener: {
							timeout: function(evt) {
                            	this.goToPage({page:$(evt.target).val()})
                        	}
						}
                    },
                    { type: 'separator'},
                    {
                        type: 'button',
                        label: "Prev",
                        cls:'prev',
                        listener: function() {
                            var page = this.option('pageModel.curPage');
                            this.goToPage({page: page-1})
                        }
                    },
                    {
                        type: 'button',
                        label: "Next",
                        cls:'next',
                        listener: function() {
                            var page = this.option('pageModel.curPage');
                            this.goToPage({page: page+1})
                        }
                    },
                    {
                        type: 'button',
                        label: "Toggle pager",
                        //cls:'next',
                        listener: function() {
                            this.pager().widget().toggle()
                            this.refresh();
                        }
                    }
                ]
            },
            dataModel: dataModel,
            colModel: colM,
            numberCell: { resizable: true, title: "#" },
            title: "Shipping Orders"
        });

})
