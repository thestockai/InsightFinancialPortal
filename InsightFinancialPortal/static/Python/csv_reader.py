#settings for importing built-in datetime and date libraries
#and external pandas_datareader libraries
import pandas_datareader.data as web
import datetime
 
#Symbol list contains stocks
symbol = ["AAPL","AMZN"]
 
#set the time period
#if end year is 2021, the start year will be 2020/01/01 
end = datetime.datetime.today()
 
start = datetime.date(end.year-1,1,1)
 
#set path for csv file if you want
#path_out = 'c:/python_programs_output/'
 
#loop through symbol list 
#if no historical data returned on any pass, try to get the ticker data again
i=0
while i<len(symbol):
    try:
        df = web.DataReader(symbol[i], 'yahoo', start, end)

        #delete two attributes of the stock, just hold Open, High, Low, Close
        df = df.drop(['Adj Close'], axis=1)
        df = df.drop(['Volume'], axis=1)

        #Using format string to set the filename depends to stock name
        path = 'yahoo_prices_for_{f}.csv'.format(f = symbol[i])
        df.to_csv(path)
        print (i, symbol[i],'has data stored to csv file')
    except:
        print("No information for ticker # and symbol:")
        print (i,symbol[i])
        continue
    i=i+1