$(function(){
    var url = "http://127.0.0.1:8080/messages";


    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url ,
            insertUrl: url ,
            updateUrl: url ,
            deleteUrl: url ,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),
        editing: {
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },

        remoteOperations: true,
        paging: {
            pageSize: 12
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [8, 12, 20]
        },
        columns: [{
            dataField: "id",
            dataType: "number",
            allowEditing: false
        }, {
            dataField: "content"
        }, {
            dataField: "sent_on",
            allowEditing: false
        }, {
            dataField: "user_from.name",
            caption: "User from",
            lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: "http://127.0.0.1:8080/users",
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    displayExpr: "id"
                }
      }, {
            dataField: "user_to.name",
            caption: "User to",
            lookup: {
                    dataSource: DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: "http://127.0.0.1:8080/users",
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    displayExpr: "id"
                }
        }, ]
    }).dxDataGrid("instance");
});