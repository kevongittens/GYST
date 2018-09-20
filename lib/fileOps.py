from urllib.request import urlopen
import json
import locale
import urllib


#class fileOps:
    
def __init__(self):
    pass


def writeTextFile(filepath, data):
    f = open(filepath, 'w')
    f.write(data)
    f.close()
    
    
#writeTextFile('myfile.txt', "test")

def readTextFile(filepath):
    with open(filepath) as f:
        str = f.read()
    return str

#print readTextFile("myfile.txt")

def readHtml(url):
    response = urlopen(url)
    data = response.read()
    print(data)
    #string = data.decode('ASCII')##.replace('\0', '') # JSON default
    #encoding = conn.info().get_content_charset('utf8')  # JSON default
    #data = json.loads(raw_data.decode(encoding))
    #json_obj = json.loads(string)
    #print(json_obj)

    
    #print readHtml('http://www.voidspace.org.uk')

    
    #def parseHtml():
        #???
        
#file = FileOps()        
#file.writeTextFile('../data/tests.txt', 'ddsfgata')