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
    data: [1,2,9,5,8,7,5]
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
    data: [1,2,9,5,8,7,5]
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
    data: [1,2,9,5,8,7,5]
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
    data: [1,2,9,5,8,7,5]
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


var optionsLine = {
  chart: {
    height: 328,
    type: 'line',
    zoom: {
      enabled: false
    },
    dropShadow: {
      enabled: true,
      top: 3,
      left: 2,
      blur: 4,
      opacity: 1,
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  //colors: ["#3F51B5", '#2196F3'],
  series: [{
      name: "column",
      data: [1,2,9,5,8,7,5]
    }
  ],
  title: {
    text: "plot_title",
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
  labels: ['1','2','9','5','8','7','5'],
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