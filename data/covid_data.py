import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

config = {
    "location_col":"location",
    "date_col":"date",
    "months":{
        1:"January",
        2:"Febuary",
        3:"March",
        4:"April",
        5:"May",
        6:"June",
        7:"July",
        8:"August",
        9:"September",
        10:"October",
        11:"November",
        12:"December"
    }
}

class CovidData:
    def __init__(self,data_file):
        self.df = pd.read_csv(data_file)
        # converting "date" column to Datetime column
        self.df["CheckDate"] = pd.to_datetime(self.df['date'])
        # adding year and month column
        self.df['year'] = pd.DatetimeIndex(self.df['date']).year
        self.df['month'] = pd.DatetimeIndex(self.df['date']).month
        self.df['month'] = self.df['month'].apply(lambda x:config["months"][x])
        #grouping the large data by location
        self.grouped_by_loc = self.df.groupby([config["location_col"]])
        # seaborn plot settings
        sns.set(rc={'figure.figsize':(21.7,8.27)})
        sns.set(style='whitegrid', rc={"grid.linewidth": 0.1})

    # returns list of all locations available
    def get_locations(self):
        lst = list(self.grouped_by_loc.groups)
        lst.remove("World") 
        return lst
    
    # Returns a list of all years data avaliable
    def get_years(self):
        return list(self.df["year"].unique())
    
    # Returns a list of all the months
    def get_months(self):
        return list(self.df["month"].unique())
    
    # Returns a list of all the dates
    def get_dates(self):
        return list(self.df["date"].unique())
    
    """
        Get world wide data for all time
        - Returns:
        -- A DataFrame object
    """
    def get_world_data(self):
        return self.df[self.df["location"] == "World"]

    """
        Get world wide data for most recent date
        - Returns:
        -- A DataFrame object
    """
    def get_world_data_latest(self):
        most_recent_date = self.df['CheckDate'].max()
        return self.df[((self.df["CheckDate"] == most_recent_date) & (self.df["location"] == "World"))]

    """
        Get all data for a location
        - Returns:
        -- A DataFrame object
    """
    def get_data_by_location(self,location):
        loc_frame = self.grouped_by_loc.get_group(location)
        return loc_frame

    """
        Get most recent data for a location
        - Returns:
        -- A DataFrame object
    """
    def get_latest_data_by_location(self,location):
        loc_frame = self.grouped_by_loc.get_group(location)
        most_recent_date = loc_frame['CheckDate'].max()
        return loc_frame[loc_frame["CheckDate"] == most_recent_date]


    """
        Get data for a specific location by it's year
        - Arguments:
        -- location : str
        -- year : int
        
        - Returns:
        -- a Dataframe object
    """
    def get_data_by_location_and_year(self,location,year):
        loc_grp = self.grouped_by_loc.get_group(location).fillna(0)
        year_data = loc_grp.groupby(["year"]).get_group(year)
        return year_data

    """
        Get the last recorded data of each month for a specific location by it's year
        - Arguments:
        -- location : str
        -- year : int
        
        - Returns:
        -- a Dataframe object
    """
    def get_month_end_data_by_location_and_year(self,location,year):
        empty_frame = pd.DataFrame()
        grouped_months = self.get_data_by_location_and_year(location,year).groupby(["month"])
        for month in list(grouped_months.groups):
            month_data = grouped_months.get_group(month)
            most_recent_date = month_data['CheckDate'].max()
            month_data = month_data[month_data["CheckDate"] == most_recent_date]
            empty_frame = empty_frame.append(month_data)
        print(empty_frame)
        return empty_frame

    """
        Get data for a specific location by it's month of the year
        - Arguments:
        -- location : str
        -- year : int
        -- month : str
        
        - Returns:
        -- a Dataframe object
    """
    def get_data_by_location_and_month_of_year(self,location,year,month):
        month_data = self.get_data_by_location_and_year(location,year).groupby(["month"]).get_group(month)
        return month_data

    """
        Creates a dotline-time series plot for a specific column based on month of year for location
    """
    def plot_dotline_by_loc_year_month(self,dataframe,location,month,year,plot_column):
        start_date = dataframe.iloc[0]["date"]
        last_updated_date = dataframe.iloc[-1]["date"]
        ax = sns.pointplot(x = "date", y = plot_column, data = dataframe,color='b',scale = 0.5)
        ax.set(xlabel="Month: "+month,ylabel=plot_column.replace("_"," ").capitalize())
        ax.set_title(label="{} data for {}, {}".format(location,month,year))
        ax.set_xticklabels(rotation=45,labels=list(dataframe["date"].unique()))
        return ax

if __name__ == "__main__":
    obj = CovidData("https://github.com/owid/covid-19-data/blob/master/public/data/jhu/full_data.csv?raw=true")

    locations = obj.get_locations()
    years = obj.get_years()
    months = obj.get_months()

    print(obj.get_latest_data_by_location("India"))
    print(obj.get_data_by_location_and_year("India",2021))
    print(obj.get_latest_data_by_location("Samoa").fillna(0))

    month_data = obj.get_data_by_location_and_month_of_year("India",2021,"December")
    obj.plot_dotline_by_loc_year_month(month_data,"India","December",2021,"new_cases")
    plt.savefig("final.jpg",dpi=250)