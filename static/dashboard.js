const choices = {country:"", year:"", month:"",column:""};

$(document).ready(function(){
    $("#country").change(function(){
      choices.country = $(this).find(":selected").text();
      if(choices.country != '' && choices.country != null){        
        $("#country_head").text(choices.country)
        console.log(choices.country)
        $.ajax({
            url: "/new_changes", 
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(choices),
            success: function (result) {
               console.log(result);
               result = parse_result(result);
               update_sparks(spark_obj1,result,"new_cases","#new_case");
               update_sparks(spark_obj2,result,"new_deaths","#new_death");
               update_sparks(spark_obj3,result,"total_cases","#total_case");
               update_sparks(spark_obj4,result,"total_deaths","#total_death");
               update_chart(chartLine,result);
            },
            error: function (err) {
              console.log(err);
              console.log(choices);
            }
        });
      }
  });

  $("#year").change(function(){
    choices.year = $(this).find(":selected").text();
    if(choices.year != '' && choices.year != null){
      $.ajax({
          url: "/new_changes", 
          type: "POST",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(choices),
          success: function (result) {
             console.log(result);          
             result = parse_result(result);
             update_sparks(spark_obj1,result,"new_cases","#new_case");
             update_sparks(spark_obj2,result,"new_deaths","#new_death");
             update_sparks(spark_obj3,result,"total_cases","#total_case");
             update_sparks(spark_obj4,result,"total_deaths","#total_death");
             update_chart(chartLine,result);
          },
          error: function (err) {
            console.log(err);
            console.log(choices);
          }
      });
    }
  });

  $("#month").change(function(){
    choices.month = $(this).find(":selected").text();
    if(choices.month != '' && choices.month != null){
      $.ajax({
          url: "/new_changes", 
          type: "POST",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(choices),
          success: function (result) {
             console.log(result);          
             result = parse_result(result);
             update_chart(chartLine,result);
          },
          error: function (err) {
            console.log(err);
            console.log(choices);
          }
      });
    }
  });

  $("#col_type").change(function(){
    choices.column = $(this).find(":selected").text();
    if(choices.month != '' && choices.month != null){
      $.ajax({
          url: "/new_changes", 
          type: "POST",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(choices),
          success: function (result) {
             console.log(result);
             result = parse_result(result);
             update_chart(chartLine,result);
          },
          error: function (err) {
            console.log(err);
            console.log(choices);
          }
      });
    }
  });
}); 

// update chart
function update_chart(chart_obj,data_updated){
  chart_obj.updateOptions({
      series: [{
        name:data_updated["column"],
        data:data_updated["values"]
      }],
      title: {
        text: data_updated["plot_title"]
      },
      labels:data_updated["labels"]
  });
};

//update sparks
function update_sparks(spark_obj,data_updated,key,elem_id){
  spark_obj.updateSeries([{
      data: data_updated[key]
  }]);
  $(elem_id).text(data_updated[key].at(-1))
};

//get updated values
function parse_result(result){
  return {
    "labels":result['labels'].split(" "),
    "values":result['data'].split(" ").map(Number),
    "plot_title":result['plot_label'],
    "column":result['column'],
    "new_cases":result['new_cases'].split(" ").map(Number),
    "new_deaths":result['new_deaths'].split(" ").map(Number),
    "total_cases":result['total_cases'].split(" ").map(Number),
    "total_deaths":result['total_deaths'].split(" ").map(Number)
  };
};

// --------------------------------------------------------------------------
// Apex dashboard
window.Apex = {
    chart: {
      foreColor: '#ccc',
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: "#535A6C",
      xaxis: {
        lines: {
          show: true
        }
      }
    }
};

var spark1 = {
  chart: {
    id: 'spark1',
    group: 'sparks',
    type: 'line',
    height: 100,
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    }
  },
  series: [{
    data: new_cases_array
  }],
  stroke: {
    curve: 'smooth'
  },
  markers: {
    size: 0
  },
  grid: {
    padding: {
      top: 25,
      bottom: 15,
      left: 120
    }
  },
  colors: ['#fff'],
  tooltip: {
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return '';
        }
      }
    }
  }
}

var spark2 = {
  chart: {
    id: 'spark2',
    group: 'sparks',
    type: 'line',
    height: 100,
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    }
  },
  series: [{
    data: new_deaths_array
  }],
  stroke: {
    curve: 'smooth'
  },
  grid: {
    padding: {
      top: 25,
      bottom: 15,
      left: 120
    }
  },
  markers: {
    size: 0
  },
  colors: ['#fff'],
  tooltip: {
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return '';
        }
      }
    }
  }
}

var spark3 = {
  chart: {
    id: 'spark3',
    group: 'sparks',
    type: 'line',
    height: 100,
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    }
  },
  series: [{
    data: total_cases_array
  }],
  stroke: {
    curve: 'smooth'
  },
  markers: {
    size: 0
  },
  grid: {
    padding: {
      top: 25,
      bottom: 15,
      left: 120
    }
  },
  colors: ['#fff'],
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  tooltip: {
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return '';
        }
      }
    }
  }
}

var spark4 = {
  chart: {
    id: 'spark4',
    group: 'sparks',
    type: 'line',
    height: 100,
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 2,
      opacity: 0.2,
    }
  },
  series: [{
    data: total_deaths_array
  }],
  stroke: {
    curve: 'smooth'
  },
  markers: {
    size: 0
  },
  grid: {
    padding: {
      top: 25,
      bottom: 15,
      left: 120
    }
  },
  colors: ['#fff'],
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  tooltip: {
    x: {
      show: false
    },
    y: {
      title: {
        formatter: function formatter(val) {
          return '';
        }
      }
    }
  }
}

var spark_obj1 = new ApexCharts(document.querySelector("#spark1"), spark1);
spark_obj1.render();
var spark_obj2 = new ApexCharts(document.querySelector("#spark2"), spark2);
spark_obj2.render();
var spark_obj3 = new ApexCharts(document.querySelector("#spark3"), spark3);
spark_obj3.render();
var spark_obj4 = new ApexCharts(document.querySelector("#spark4"), spark4);
spark_obj4.render();


// --------------------------------------------------------------------------------------------------------
//  Line chart
// --------------------------------------------------------------------------------------------------------

var optionsLine = {
  chart: {
    height: 328,
    type: 'line',
    zoom: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 2,
      blur: 4,
      opacity: 0.1,
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  //colors: ["#3F51B5", '#2196F3'],
  series: [{
      name: column,
      data: data_list
    }
  ],
  title: {
    text: plot_title,
    align: 'center',
    offsetY: 25,
    offsetX: 20
  },
  markers: {
    size: 6,
    strokeWidth: 0,
    hover: {
      size: 9
    }
  },
  grid: {
    show: true,
    padding: {
      bottom: 0
    }
  },
  labels: labels_list,
  xaxis: {
    tooltip: {
      enabled: false
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    offsetY: -20
  }
}

var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
chartLine.render();


// --------------------------------------------------------------------------------------------------------
//  Radial chart
// --------------------------------------------------------------------------------------------------------

var optionsRadial = {
  series: [44, 55, 67, 83],
  chart: {
  height: 350,
  type: 'radialBar',
},
plotOptions: {
  radialBar: {
    dataLabels: {
      name: {
        fontSize: '22px',
      },
      value: {
        fontSize: '16px',
      },
      total: {
        show: true,
        label: 'Total',
        formatter: function (w) {
          // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
          return 249
        }
      }
    }
  }
},
labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
};

var chartRadial = new ApexCharts(document.querySelector("#radial-chart"), optionsRadial);
chartRadial.render();



// --------------------------------------------------------------------------------------------------------
//  Bar chart
// --------------------------------------------------------------------------------------------------------

var optionsBar = {
  series: [{
  name: 'Net Profit',
  data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
}, {
  name: 'Revenue',
  data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
}, {
  name: 'Free Cash Flow',
  data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
}],
  chart: {
  type: 'bar',
  height: 350
},
plotOptions: {
  bar: {
    horizontal: false,
    columnWidth: '55%',
    endingShape: 'rounded'
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  show: true,
  width: 2,
  colors: ['transparent']
},
xaxis: {
  categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
},
yaxis: {
  title: {
    text: '$ (thousands)'
  }
},
fill: {
  opacity: 1
},
tooltip: {
  y: {
    formatter: function (val) {
      return "$ " + val + " thousands"
    }
  }
}
};

var chartBar = new ApexCharts(document.querySelector("#column-chart"), optionsBar);
chartBar.render();

// --------------------------------------------------------------------------------------------------------
//  Table
// --------------------------------------------------------------------------------------------------------

new gridjs.Grid({
  columns: ["Name", "Email", "Phone Number"],
  data: [
    ["John", "john@example.com", "(353) 01 222 3333"],
    ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
    ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
    ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
    ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
  ],
  style: {
    td: {
      border: '1px solid #ccc'
    },
    table: {
      'font-size': '15px'
    }
  },
  search: {
    enabled: true
  },
  autoWidth:true,
  sort:true
}).render(document.getElementById("table"));


$(document).ready(function() {
  $('#country').select2(
    {
      placeholder: "Select a country",
      allowClear: true
    }
  );

  $('#year').select2(
    {
      placeholder: "Select a year",
      allowClear: true
    }
  );

  $('#month').select2(
    {
      placeholder: "Select month",
      allowClear: true
    }
  );

  $('#col_type').select2(
    {
      placeholder: "Select an option",
      allowClear: true
    }
  );
});
  