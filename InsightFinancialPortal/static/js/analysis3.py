import yfinance as yf
import datetime
end = datetime.datetime.today()
symbol = ['APEI','AAL','AAPL','AMC','AMD','AMZN','AZN','BA','BAC','BB','BILI','BLCT','BABA','BB','BTBT','BNGO','BLNK'
,'BAC','CBAT','CCL','CLF','CRM','CLPR','DIS','DBX','DGLY','F','FB','GE','GM','GOOG','KO',
'LRN','LI','MSFT','NVDA','PTON','PLTR','STX','TCEHY','TSLA','TSM','TWOU','TLRY','FSLY','FUBO','GPRO',
'GOLD','SQ','SOLO','SDC','SUMO','TOUR','JNJ','JD','JMIA','LAZR','INO','NIO',
'INTC','AU','USO','PDD','QS','REGI','RMO','RLX','GE','IVR','KXIN','FROG','U','VJET','WPG','WOOF','X','XPEV','LUV','SPY'
,'XLF','EEM','EWZ','IWM','VXX','SLV','EFA','GDX','HYG','SDS','FXI','TQQQ','SQQQ','UDOW','SDOW','QQQ','UPRO','SPXL']
def getYesterday():
    today=datetime.date.today()
    oneday=datetime.timedelta(days=1)
    yesterday=today-oneday
    return yesterday.strftime('%Y-%m-%d')
# start = getYesterday()
start = '2021-5-22'
i = 0
while i < len(symbol):
        df = yf.Ticker(symbol[i]).history(period='1d', start='2021-5-22').drop(['Dividends', 'Stock Splits'], axis=1)

        #delete two attributes of the stock, just hold Open, High, Low, Close

        #Using format string to set the filename depends to stock name
        path = '/InsightFinancialPortal/csv/actual_val_Y/yahoo_prices_for_{f}.csv'.format(f = symbol[i])
        row = df.loc['2021-5-21']
        oneday = datetime.timedelta(days = 1)
        day = datetime.date(2021,5,22)
        for i in range(15):
                day += oneday
                df.loc[day.strftime('%Y-%m-%d')] = row
        df.to_csv(path,sep = ',')
