
function validate(symbol) {
    const stocksAvilable = ['APEI','AAL','AAPL','AMC','AMD','AMZN','AZN','BA','BAC','BB','BILI','BLCT','BABA','BB','BTBT','BNGO','BLNK'
,'BAC','CBAT','CCL','CLF','CRM','CLPR','DIS','DBX','DGLY','F','FB','GE','GM','GOOG','KO',
'LRN','LI','MSFT','NVDA','PTON','PLTR','STX','TCEHY','TSLA','TSM','TWOU','TLRY','FSLY','FUBO','GPRO',
'GOLD','SQ','SOLO','SDC','SUMO','TOUR','JNJ','JD','JMIA','LAZR','INO','NIO',
'INTC','AU','USO','PDD','QS','REGI','RMO','RLX','GE','IVR','KXIN','FROG','U','VJET','WPG','WOOF','X','XPEV','LUV','SPY'
,'XLF','EEM','EWZ','IWM','VXX','SLV','EFA','GDX','HYG','SDS','FXI','TQQQ','SQQQ','UDOW','SDOW','QQQ','UPRO','SPXL','EDU','TAL'];
    symbol = symbol.split(" ").join("");
    symbol.toUpperCase();
    if (stocksAvilable.includes(symbol)) {
        return (true);
    } else {
        return (false);
    }
}