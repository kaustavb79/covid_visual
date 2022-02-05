from flask import Flask, Markup, render_template,request,url_for
from data.covid_data import CovidData

app = Flask(__name__)

data_url = r"https://github.com/owid/covid-19-data/blob/master/public/data/jhu/full_data.csv?raw=true"
obj = CovidData(data_url)   

@app.route('/new_changes',methods=['GET', 'POST'])
def change_view():
    if request.method == 'POST':
        data = request.get_json()
        if not data["month"]:
            if not data["year"]:
                data["year"] = "2021"
            yearly_data = obj.get_month_end_data_by_location_and_year(data["country"],int(data["year"]))
            if not data["column"]:
                data["column"] = "total_cases"
            else:
                data["column"] = data["column"].replace(" ","_").lower()
            result = {
                "data":" ".join([str(x) for x in yearly_data[data["column"]].to_list()]),
                "labels":" ".join([str(x) for x in yearly_data["month"].tolist()]),
                "plot_label": "{} in {} for {}".format(data["column"].replace("_"," ").capitalize(),data["country"],data["year"])
            }
        return(result)

@app.route('/')
def home_page():    
    loc = "World"
    yr = 2021
    col = "Total Cases"
    x_label = "Months"
    default_data = obj.get_month_end_data_by_location_and_year(loc,yr)
    return render_template('dashboard.html',
                title = "SARS-CoV-2 Data",
                max = 500,
                labels = default_data["month"].tolist(),
                values = default_data["total_cases"].tolist(),
                plot_label = "{} in {} for {}".format(col,loc,yr),
                location_list = obj.get_locations(),
                years_list = obj.get_years(),
                months_list = obj.get_months(),
                disp_type = obj.get_columns()
            )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,debug=True)
