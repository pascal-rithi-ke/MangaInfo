import pymongo
from bson import json_util,ObjectId
import json
from flask import Flask,jsonify

connect = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = connect["Manga_info"]
mycol = mydb["manga_collection"]
mycol2 = mydb["explain_moment"]


"""
Ajouter un manga dans la bdd
nb = 0
scan = input('enter manga name :')

def getInfo(scan):
        search = MangaSearch(scan)
        manga_id = search.results[nb].mal_id
        PlusInfo = Manga(manga_id)
        autor = PlusInfo.authors
        test = PlusInfo.synopsis
        title = search.results[nb].title
        img = search.results[nb].image_url
        score = search.results[nb].score
        synopsis = search.results[nb].synopsis
        genre = input('enter genre :')
        print(manga_id,'\n', autor, '\n', title, '\n', img, '\n', score, '\n', synopsis, '\n',genre)

        mydict = {"id": manga_id,"nom":title,"autor":autor,"url_img":img,"score":score,"synopsis":test,"genre":genre}
        x = mycol.insert_one(mydict)
def new_manga():
        continuer = True
        while continuer :
                choix = input("Do you want to continue ? o/n: ")
                if choix == ('o'):
                        new_manga = input("enter new manga :")
                        getInfo(new_manga)
                else:
                        print("End Program")
                        continuer = False
getInfo(scan)
new_manga()
"""

app = Flask(__name__)

@app.route("/home", methods = ["GET"])
def detail():
        output = []
        for x in mycol.find():
                output.append({'id' : x['id'],'name':x['name'],'autor':x['autor'],'img':x['url_img'],'score':x['score'],'synopsis':x['synopsis'],'genre':x['genre'],})
        """ici"""
        response = jsonify({'results':output})
        response.headers.add("Access-Control-Allow-Origin","*")
        return response

@app.route('/home/<id>', methods = ['GET'])
def getSoloManga(id):
        mydoc = mycol2.find({'id':id})
        '''Get field'''
        output = []
        for x in mydoc:
                output.append(x)
                """
                field=list(x.keys())
                for getfield in field:
                        output.append(getfield)
                        for z in output:
                         tab.append(z) 
                        print(tab)
                """
        conv = json.loads(json_util.dumps(output))
        response = jsonify({'results':conv})
        response.headers.add("Access-Control-Allow-Origin","*")
        return response
                
if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=True)