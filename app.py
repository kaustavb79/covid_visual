from flask import Flask, Markup, render_template
from data.covid_data import CovidData

app = Flask(__name__)

def get_world_count():
    pass

@app.route('/',methods=['GET', 'POST'])
def home_page() :
    data_url = r"https://github.com/owid/covid-19-data/blob/master/public/data/jhu/full_data.csv?raw=true"
    obj = CovidData(data_url)

    locations = obj.get_locations()
    years = obj.get_years()
    months = obj.get_months()

    loc = "India"
    yr = 2021
    col = "Total Cases"
    x_label = "Months"
    yearly_data = obj.get_month_end_data_by_location_and_year(loc,yr)

    return render_template('index.html',
                title = "SARS-CoV-2 Data",
                max = 500,
                labels = yearly_data["month"].tolist(),
                values = yearly_data["total_cases"].tolist(),
                plot_label = "{} in {} for {}".format(col,loc,yr)
            )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,debug=True)
