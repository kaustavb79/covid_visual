from flask import Flask, Markup, render_template,request,url_for
from data.covid_data import CovidData

app = Flask(__name__)

data_url = r"https://github.com/owid/covid-19-data/blob/master/public/data/jhu/full_data.csv?raw=true"
obj = CovidData(data_url)   

@app.route('/new_changes',methods=['GET', 'POST'])
def change_view():
    if request.method == 'POST':
        data = request.get_json()
        # print(data)
        if not data["year"]:
            data["year"] = "2022"
        yearly_data = obj.get_month_end_data_by_location_and_year(data["country"],int(data["year"]))
        total_cases_lst = yearly_data["total_cases"].tolist()
        total_cases_lst.sort()
        total_deaths_lst = yearly_data["total_deaths"].tolist()
        total_deaths_lst.sort()
        if not data["column"]:
            data["column"] = "total_cases"
        else:
            data["column"] = data["column"].replace(" ","_").lower()
        result = {
            "data":"",
            "labels":"",
            "plot_label":"",
            "total_cases":" ".join([str(int(x)) for x in total_cases_lst]),
            "total_deaths":" ".join([str(int(x)) for x in total_deaths_lst]),
            "new_cases":" ".join([str(int(x)) for x in yearly_data["new_cases"].tolist()]),
            "new_deaths":" ".join([str(int(x)) for x in yearly_data["new_deaths"].tolist()]),
            "column":"{}".format(data["column"].replace("_"," ").capitalize())
        }   
        if not data["month"] or "Choose" in data["month"]:            
            result["data"] = " ".join([str(int(x)) for x in yearly_data[data["column"]].to_list()]);
            result["labels"] = " ".join([str(x) for x in yearly_data["month"].tolist()]);
            result["plot_label"] = "{} in {} for {}".format(data["column"].replace("_"," ").capitalize(),data["country"],data["year"])
        else:
            month_result = obj.get_data_by_location_and_month_of_year(data["country"],int(data["year"]),data["month"])
            result["data"] = " ".join([str(int(x)) for x in month_result[data["column"]].to_list()]);
            result["labels"] = " ".join([str(x) for x in month_result["date"].tolist()]);
            result["plot_label"] = "{} in {} for {}-{}".format(data["column"].replace("_"," ").capitalize(),data["country"],data["month"],data["year"])
        return(result)

@app.route('/')
def home_page():    
    loc = "World"
    yr = 2022
    col = "Total Cases"
    x_label = "Months"
    default_data = obj.get_month_end_data_by_location_and_year(loc,yr)
    # default_data = obj.get_world_data()

    total_cases_lst = default_data["total_cases"].tolist()
    total_cases_lst.sort()
    total_deaths_lst = default_data["total_deaths"].tolist()
    total_deaths_lst.sort()
    new_cases_lst = default_data["new_cases"].tolist()
    # new_cases_lst.sort()
    new_deaths_lst = default_data["new_deaths"].tolist()
    # new_deaths_lst.sort()

    return render_template('dashboard.html',
                title = "CoviMeter Dashboard",
                column = col,
                labels = default_data["month"].tolist(),
                values = default_data["total_cases"].tolist(),
                plot_label = "{} in {} for {}".format(col,loc,2022),
                location_list = obj.get_locations(),
                years_list = obj.get_years(),
                months_list = obj.get_months(),
                disp_type = obj.get_columns(),
                total_cases = list(map(int,total_cases_lst)),
                total_deaths = list(map(int,total_deaths_lst)),
                new_cases = list(map(int,new_cases_lst)),
                new_deaths = list(map(int,new_deaths_lst)),
                update = default_data['CheckDate'].max(),
                location = loc
            )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,debug=True)
