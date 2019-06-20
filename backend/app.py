
from flask import Flask, request
from flaskext.mysql import MySQL
from flask_cors import CORS
from collections import OrderedDict
import json

app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'akfldkelql123!'
app.config['MYSQL_DATABASE_DB'] = 'report'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
app.config['MYSQL_DATABASE_PORT'] = 3306

mysql.init_app(app)


def ExecuteQuery(sql):
  cur = mysql.connect().cursor()
  cur.execute(sql)

  results = [dict((cur.description[i][0], value)
  for i, value in enumerate(row)) for row in cur.fetchall()]

  #results =  cur.fetchall()
  return results

@app.route('/weekly_report')
def weeklyList():
  results = ExecuteQuery('select id, gubun, document_num, title ,content from weekly_report')
  return json.dumps(results)

@app.route('/weekly_report_insert' ,methods=["POST"])
def insertWeeklyReport():
  if request.method == 'POST':
     v_gubun        = request.form.get('gubun', None)
     v_document_num = request.form.get('document_num', None)
     v_content      = request.form.get('content', None)
     v_title        = request.form.get('title', None)
     print(v_title)

     cur     = mysql.connect()
     query   = "INSERT INTO weekly_report (gubun, document_num, title ,content ) VALUES (%s, %s, %s, %s)"
     values  = (v_gubun ,v_document_num , v_content ,v_title)
     cur.cursor().execute(query, values)
     cur.commit()
     return 'Y'
  else:
     request.args.get('title')
     return 'N'




@app.route('/weekly_report_delete' ,methods=["POST"])
def deleteWeeklyReport():
  if request.method == 'POST':
     v_id        = request.form.get('id', None)
     print(v_id)

     cur     = mysql.connect()
     query   = "DELETE FROM weekly_report where id = %s"
     values  = (v_id)
     cur.cursor().execute(query, values)
     cur.commit()
     return 'Y'
  else:
     request.args.get('title')
     return 'N'



if __name__ == '__main__':
  app.run(debug=True)