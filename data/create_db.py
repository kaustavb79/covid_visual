from sqlalchemy import create_engine
import pymysql
import pandas as pd
import json

if __name__ == "__main__":
    dbConfig = json.load(open("../dbConfig.json"))
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
    df = pd.read_csv(r"https://github.com/owid/covid-19-data/blob/master/public/data/jhu/full_data.csv?raw=true")
    # converting "date" column to Datetime column
    df["CheckDate"] = pd.to_datetime(df['date'])
    # adding year and month column
    df['year'] = pd.DatetimeIndex(df['date']).year
    df['month'] = pd.DatetimeIndex(df['date']).month
    df['month'] = df['month'].apply(lambda x:config["months"][x])

    cusrorType = pymysql.cursors.DictCursor
    connectionInstance = pymysql.connect(host=dbConfig["databaseServerIP"], user=dbConfig["user"], password=dbConfig["password"],charset=dbConfig["charSet"],cursorclass=cusrorType)
    try:
        cursor_obj = connectionInstance.cursor()
        cursor_obj.execute("CREATE DATABASE {}".format(dbConfig["database"]))
    except Exception as e:
        print("\n\tException: "+e)
    finally:
        connectionInstance.close()
    
    sqlEngine = create_engine('mysql+pymysql://{}:{}@{}/{}'.format(dbConfig["user"],dbConfig["password"],dbConfig["databaseServerIP"],dbConfig["database"]), pool_recycle=3600)
    dbConnection = sqlEngine.connect()
    try:
        dataFrame = df
        frame = dataFrame.to_sql(dbConfig["table_name"], dbConnection, if_exists='fail',index=False);
    except ValueError as vx:
        print(vx)
    except Exception as ex:   
        print(ex)
    else:
        print("Table %s created successfully."%dbConfig["table_name"]);   
    finally:
        dbConnection.close()
