import lib.fileOps
from datetime import datetime



#test = lib.fileOps()

#url = 'https://www.gasci.com/results/current.htm'
url = 'http://www.google.com'

"""
scraping the website at gasci.com for the latest trade data.


file scraping sequence
pull html from website to stage folder 
-uniquely ID the file
-clean the data 
-store cleaned data in a new uniquely IDed csv file 
""" 

def pullHtml():
    lib.fileOps.writeTextFile(uidFile(), lib.fileOps.readHtml(url))
    
    
    
def uidFile():
    return ('data/gasciCurrent_'+ (datetime.today()).isoformat())
    
    
pullHtml()