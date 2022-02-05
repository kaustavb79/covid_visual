const choices = {country:"", year:"", month:"",column:""};

$(document).ready(function(){
    $("#country").change(function(){
	  	choices.country = $(this).find(":selected").text();
	 	$.ajax({
		    url: "/new_changes", 
		    type: "POST",
		    dataType: "json",
		    contentType: "application/json; charset=utf-8",
		    data: JSON.stringify(choices),
		    success: function (result) {
		       console.log(result);
		       labels_list_updated = result['labels'].split(" ");
		       data_list_updated = result['data'].split(" ").map(Number);
		       plot_title_updated = result['plot_label'];
		       update_chart(line_chart,data_list_updated,labels_list_updated,plot_title_updated);
		       update_chart(bar_chart,data_list_updated,labels_list_updated,plot_title_updated);
		    },
		    error: function (err) {
		    	alert("error: "+err)
		    }
		});
	});

	$("#year").change(function(){
	  choices.year = $(this).find(":selected").text();
	  $.ajax({
		    url: "/new_changes", 
		    type: "POST",
		    dataType: "json",
		    contentType: "application/json; charset=utf-8",
		    data: JSON.stringify(choices),
		    success: function (result) {
		       console.log(result);
		       labels_list_updated = result['labels'].split(" ");
		       data_list_updated = result['data'].split(" ").map(Number);
		       plot_title_updated = result['plot_label'];
		       update_chart(line_chart,data_list_updated,labels_list_updated,plot_title_updated);
		       update_chart(bar_chart,data_list_updated,labels_list_updated,plot_title_updated);
		    },
		    error: function (err) {
		    	alert("error: "+err)
		    }
		});
	});

	$("#month").change(function(){
	  choices.month = $(this).find(":selected").text();
	});

	$("#col_type").change(function(){
	  choices.column = $(this).find(":selected").text();
	  $.ajax({
		    url: "/new_changes", 
		    type: "POST",
		    dataType: "json",
		    contentType: "application/json; charset=utf-8",
		    data: JSON.stringify(choices),
		    success: function (result) {
		       console.log(result);
		       labels_list_updated = result['labels'].split(" ");
		       data_list_updated = result['data'].split(" ").map(Number);
		       plot_title_updated = result['plot_label'];
		       update_chart(line_chart,data_list_updated,labels_list_updated,plot_title_updated);
		       update_chart(bar_chart,data_list_updated,labels_list_updated,plot_title_updated);
		    },
		    error: function (err) {
		    	alert("error: "+err)
		    }
		});
	});
});	


// update chart
function update_chart(chart_obj,data_list_updated,labels_list_updated,plot_title_updated){
	chart_obj.data.datasets[0].data = data_list_updated;
	chart_obj.data.datasets[0].label = plot_title_updated;
	chart_obj.data.labels = labels_list_updated;
	chart_obj.update();
};

// -----------------------------------------------------------------------------
var options = {
    responsive: false,
    scales: {
        xAxes: [{
            ticks: {
            maxRotation: 90,
            minRotation: 80
            },
            gridLines: {
                offsetGridLines: true 
            }
        },
        {
            position: "top",
            ticks: {
                maxRotation: 90,
                minRotation: 80
            },
            gridLines: {
                offsetGridLines: true 
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}

// Line chart 
const line_chart_tag = document.getElementById('line_chart').getContext('2d');
const line_chart = new Chart(line_chart_tag, {
    type: "line",
    data: {
        labels: labels_list,
        datasets: [
            {
                label: plot_title,
                pointRadius: 4,
                pointBackgroundColor: "rgb(0,0,255)",
                data: data_list,
                backgroundColor: [
                    'rgb(230, 255, 255)'
                ],                 
                borderWidth: 3,
            }
        ]
    },
    options: options
});

// Bar Chart
var bar_chart_element = document.getElementById("bar_chart");
var bar_chart = new Chart(bar_chart_element, {
    type: 'bar',
    data: {
        labels: labels_list,
        datasets: [
            {
                label: plot_title,
                data: data_list,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    },
    options: options
});