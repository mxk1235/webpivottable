[Back to Home](./index.html)

## What's WPT file?

WPT file is a WebPivotTable file which includes your data and pivot selections. 
WebPivotTable component allows you to save your content in a WPT file, which can then be opened directly.

## WPT format

The WPT format is pretty simple; it's just a string of JSON objects. Here is a sample:

    {
        "format": "WPT",
        "version": "2.0",
        "sources":[{
            "id":1,
            "name":"Source1",
            "mode":"MEMORY",
            "format":"CSV",
            "url":"/json/example.csv",
            "data":[           // data array
                [               // first row data
                  0,     // value is the index of lookups array
                  ...
                  0      // the last field
                ],
                ...
                [            
                   3999,
                   ...
                   1
                ]
            ],
            "fields": [        // fields array
                {
                    "id":0,        //a unique id, not necessary the same as index
                    "name":"0",   //field name, equal to index
                    "label":"VOTER",  //display label
                    "lookups":[
                       "1012"   //value
                       "1013",
                         ...
                       "5162"
                    ],
                    "type":"NUMBER"  // MEASURE -- number    ATTRIBUTE -- string
                },
                ...
                {
                    "id":6,
                    "name":"6",
                    "label":"BALLOT STATUS",
                    "lookups":[
                        "PERM",
                        ...
                        "ABT"
                    ],
                   "type":"STRING"
                }
            ]
        },
        ...
        {
            "id": 3,
            "name": "Source3",
            ...
        }
    ],
        
    "sheets":[{
        "id":1,
        "name":"Sheet1",
        "sourceId":1,
        "fields":[{
            "id":0,
            "name":"0",
            "label":"VOTER",
            "sort":{        // if not exist, default to descend = 0
                       // and sortValieId =0
                descend: 0,   // 0--ascend  1--descend
                sortValueId: 0 // 0: sort by self field,
                          //otherwise is the id of value field
            },
            "filter":{
                filterType: 0, // 0-label  1-value 2-top/bottom
                exclude: [   // only for filterType=0 , filter out lists
                    0: 1,    // key is the lookups key  
                    4: 1,
                    ...
                    100:1
                ],
                filterValueId: 1,  // filter by or top value field id
                                  //(for filterType =1 or =2)
                filterOperator: "EQ", // filter By value operator: (filterType =1)
                         //     'EQ':"equals"
                         //     'NE':"does not equal"
                         //     'GT':"is great than"
                         //     'GE':"is great than or equal to"
                         //     'LT':"is less than"
                         //     'LE':"is less than or equal to"
                         //     'BT':"is between"
                         //     'NB':"is not between"
                         // Top/Bottom operator: (filterType =2)
                         //     'TOP': "Top"
                         //     'BOTTOM': "Bottom"  
                filterValue: 10000,   // filter value (filterType =1)
                                 // or top/bottom number (filterType =2)
                filterValue1: null    // for filterType =1
                         // and filterOperator = 'BT' or 'NB'
            },
            "type":"NUMBER"
        },
        ....
        {
            "id":6,
             "name":"6",
             "label":"BALLOT STATUS",
             "type":"STRING"
        }],
        "rows":[1,4],   // pivot selection of rows, value is the index of fields
        "cols":[3],     // pivot selection of columns, value is the index of fields
        "filters":[],   // pivot selection of filters, value is the index of fields
        "values":[{      // pivot selection of values
            "id":1,          // an unique id (start from 1)
            "label":"Sum of PRECINCT",  //display label
            "fieldIndex":2,  // base field index of fields
            "stats":"Sum",   // Sum/Count/Average/Max/Min/
                             // Median/Mode/Stddev/Variance
            "showValueAs": 0, // if not exist, the same as 0
                       //    0 - No Calculation
                      //    1 - % of Grand total
                      //    2 - % of column total
                      //    3 - % of row total
                      //    4 - % of parent column
                      //    5 - % of parent row
            "format":{        // if nor exist, the same as category ="GENERAL"
                category: "NUMBER",  //
                       // GENERAL --- No format
                       // NUMBER --- Number format
                       // CURRENCY --- Number format + symbol
                       // PERCENTAGE --- %
                decimal: 2,  // decimal point position    
                separatorFlag: true,  // true/false add thousand Separator or not  
                symbol: "$",    // currency symbol
                symbolSuffix: 0,   // 0/1    0 --- prefix   1--- suffix
                negative: 0       // negative number format
                    //  0 ---  no format -1234.5678
                    //  1 ---  (1234.5678)
                    //  2 ---  (-1234.5678)
                    //  3 --- (1234.5678)
                    //  4 --- (-1234.5678)
                }
            }],
            "valuesInAxis":-1,   // if values length >1, values in which axis
                    //  0--cols  1--rows else -1
            "valuesIndex":-1,    // if value length >1, the index of values in axis
                    // else -1
            "sheetOptions":{
                "chartFirst":0,
                "pivotLayout":"1",
                "expandRows":1,
                "expandCols":1,
                "nonEmpty":1,
                "mdx":""
            },
            "gridOptions"{
                "showSigns":1,
                "showRowTotals":1,
                "showColTotals":1,
                "showRowSubtotals":1,
                "showColSubtotals":1,
                "compactForm":1,
                "rowHeaderWidth":200,
                "cellWidth":100,
                "cellHeight":23,
                "theme":"wpt-default"
            },  
            "chartOptions":{
                "width":500,
                "height":300,
                "high":{
                    "theme":"default",  //default, grid, gray, skies, drak-blue, drak-green
                    chart:{
                        type:'column',  //column, bar, line, spline, area, areaspline, pie
                        options3d: {
                            enabled: false,
                            alpha: 15,
                            beta: 15,
                            depth: 50,
                            viewDistance: 25
                        }
                    },
                        credits: {
                            enabled:false
                        },
                        exporting: {
                            enabled:true
                        },
                        navigation:{
                            buttonOptions:{
                                align: 'right',   // left, center, right
                                verticalAlign: 'top' // top, middle, bottom
                            }
                        },
                        legend: {
                            enabled: true,
                            floating: false,
                            layout: 'vertical',  //horizontal, vertical
                            align: 'right',      // left, center, right
                            verticalAlign: 'middle', // top, middle, bottom
                            reversed: false
                        },
                        tooltip:{
                            enabled: true,
                            shadow: true
                        },
                        plotOptions: {
                            series:{
                                stacking: null //null, 'normal', "percent"
                            }
                        },
                        xAxis: {
                            labels:{
                                enabled: true,
                                align:'left',  // left, center, right
                                rotation:45    // 0 -- 360
                            }
                        }
                    }
                }
            },
            ...
        ],
        "reports":[
            {
                "id":1,
                "name":"Report1",
                "components":[
                    {
                        "id":1,
                        "label":"Sheet1 - Grid",
                        "type":"GRID",
                        "sheetId":1
                    },
                    {
                        "id":2,
                        "label":"Sheet1 - Chart",
                        "type":"CHART",
                        "sheetId":1
                    }
                ],
                "reportOptions":{}
            },
            ...
        ],
        "ptIndex":0,"
        "dsIndex":0,"
        view":"PIVOTTABLE"
    }