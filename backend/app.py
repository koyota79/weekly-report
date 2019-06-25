
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


def ExecuteQuery(sql,param):
  cur = mysql.connect().cursor()
  cur.execute(sql ,param)

  results = [dict((cur.description[i][0], value)
  for i, value in enumerate(row)) for row in cur.fetchall()]

  #results =  cur.fetchall()
  return results

@app.route('/weekly_report' ,methods=["POST"]) 
def weeklyList():
  if request.method == 'POST':
      v_week         = request.form.get('p_week', None)
      print(v_week)
      list = ExecuteQuery('select id, gubun, document_num, title ,content ,complate ,type from weekly_report where week =%s',v_week)
      v_result = json.dumps({
        "result"   : "Y" ,
        "LIST"     : list
      })
      return v_result
  else :
      return "N"

@app.route('/weekly_report_insert' ,methods=["POST"])
def insertWeeklyReport():
  if request.method == 'POST':
     v_user_id       = "kim" #request.form.get('user_id', None)
     v_year          = "2019" #request.form.get('year', None)
     v_month         = "06" #request.form.get('month', None)
     v_week          = "4" #request.form.get('week', None)
     v_gubun         = request.form.get('p_gubun', None)
     v_document_num  = request.form.get('p_document_num', None)
     v_content       = request.form.get('p_content', None)
     v_title         = request.form.get('p_title', None)
     v_complate      = request.form.get('p_complate', None)
     v_type          = request.form.get('p_type', None)
  
     con     = mysql.connect()
     cursor  = con.cursor()
     query   = "INSERT INTO weekly_report (user_id ,year ,month ,week ,gubun, document_num, title ,content ,complate ,type)"
     query   +="VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
     values  = (v_user_id ,v_year ,v_month ,v_week ,v_gubun ,v_document_num , v_content ,v_title ,v_complate ,v_type)
     cursor.execute(query, values)
     v_insertId = con.insert_id()
     con.commit()
     con.close()
     v_result = json.dumps({
        "result"   : "Y" ,
        "insertId" : v_insertId
     })

     return v_result
  else:
     
     v_result = json.dumps({
        result   : "N" 
     })
     return v_result




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




@app.route('/weekly_report_update' ,methods=["POST"])
def updateWeeklyReport():
  if request.method == 'POST':
     v_user_id       = "kim" #request.form.get('user_id', None)
     v_year          = "2019" #request.form.get('year', None)
     v_month         = "06" #request.form.get('month', None)
     v_week          = "4" #request.form.get('week', None)
     v_id            = request.form.get('id', None)
     v_gubun         = request.form.get('p_gubun', None)
     v_document_num  = request.form.get('p_document_num', None)
     v_content       = request.form.get('p_content', None)
     v_title         = request.form.get('p_title', None)
     v_complate      = request.form.get('p_complate', None)
     v_type          = request.form.get('p_type', None)
  
     con     = mysql.connect()
     cursor  = con.cursor()
     query   = "UPDATE weekly_report SET gubun = %s ,document_num = %s ,content = %s ,title = %s ,complate = %s ,type = %s WHERE id = %s "
     values  = (v_gubun ,v_document_num , v_content ,v_title ,v_complate ,v_type ,v_id)
     cursor.execute(query, values)
     con.commit()
     con.close()
     v_result = json.dumps({
        "result"   : "Y" 
     })

     return v_result
  else:
     
     v_result = json.dumps({
        result   : "N" 
     })
     return v_result


if __name__ == '__main__':
  app.run(debug=True)