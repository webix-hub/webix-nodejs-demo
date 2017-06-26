module.exports = function(req){

  var menu = [
    { value:"Data Table", data:[
      { href:'/grid', value:"Loading and Saving" },
      { href:'/grid-dynamic', value:"Dynamic Loading" },
      { href:'/grid-paging', value:"Paging" },
    ]},
    { value:"Tree", data:[
      { href:'/tree', value:"Data Loading" },
    ]},
    { value:"Form", data:[
      { href:'/form', value:"Loading and Saving" },
      { href:'/form-uploading', value:"File Uploading" }
    ]}
  ];

  for (var i=0; i<menu.length; i++)
    for (var j = 0; j < menu[i].data.length; j++) {
      var item = menu[i].data[j];
      if (item.href == req.url)
        item.css = "selected";
    }

  return { menu };
};