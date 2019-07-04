
from flask import Flask, request ,session , url_for ,escape ,redirect
from flaskext.mysql import MySQL
from flask_cors import CORS
from login.loginManager import loginManager
import os
import json
# import socket
# _socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# _socket.connect(('26.2.111.149', 5000))
#https://pynative.com/python-mysql-select-query-to-fetch-data/


app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'akfldkelql123!'
app.config['MYSQL_DATABASE_DB'] = 'report'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['SECRET_KEY'] = b'_5#y2L"F4Q8z\n\xec]/' #os.urandom(12)

#app.secret_key = os.urandom(12)
mysql.init_app(app)


def ExecuteQuery(sql,param):
  cur = mysql.connect().cursor()
  cur.execute(sql ,param)

  results = [dict((cur.description[i][0], value)
  for i, value in enumerate(row)) for row in cur.fetchall()]

  #results =  cur.fetchall()
  return results


@app.route('/')
def index():
    if 'userId' in session:
        return 'Logged in as %s' % escape(session['userId'])
    return 'You are not logged in'


@app.route('/login' ,methods=["POST"]) 
def login():
   #app.secret_key = os.urandom(12)
 
   response = {'token' : '' ,
               'data'  : {
                       'name'    : '',
                       'levels'  : 0 ,
                       'message' : ''  
                      }
    }
   if request.method == 'POST':
         v_userId        = request.form.get('p_userId', None)
         v_password      = request.form.get('p_password', None)

         print(":::::::userLogin::::::::")
         print(v_userId)
         print(v_password)
         
         #LoginManager.loginCheck(v_userId ,v_password) 
         print(loginManager.__name__)
         cux = mysql.connect()
         retChk = loginManager().loginCheck(cux ,v_userId ,v_password)
         cux.close()

         # cur = mysql.connect().cursor()
         # v_query  = "select count(1) from member where user_id =%s and password=%s "
         # v_param  = (v_userId ,v_password)
         # cur.execute(v_query, v_param)
         # record = cur.fetchone()
         # print(record)


         # flask_jwt_extended pyjwt
         # token: '1a2b3c4dff',
         #   data: {
         #    userId  : '',
         #    name    : '',
         #    levels  : 1
         # }

         if retChk[0] > 0 : 
              response = {
                'token' : '',
                'data'  : {
                            'name'    : retChk[1],
                            'levels'  : retChk[2] ,
                            'message' : '로그인 성공.'
                          }              
              }
         else : 
              response.data = {'message' : '등록된 아이디가 없습니다..'}              

         return json.dumps(response)
   else :
         return "N"

@app.route('/logout')
def logout():
      session.clear()
      v_result = json.dumps({
         "loggedIn"  : "N" 
      })
      return v_result


@app.route('/weekly_report' ,methods=["POST"]) 
def weeklyList():
  if request.method == 'POST':
      v_week         = request.form.get('p_week', None)
      v_month        = request.form.get('p_month', None)
      v_start_dt     = request.form.get('p_start_dt', None)

      print(":::::::::::::::")
      print(v_month)
      print(v_start_dt)
      
      v_query = "select id, gubun, document_num, title ,content ,complete ,type from weekly_report where user_id =%s and started=%s "
      v_param = ("kim",v_start_dt)
      list = ExecuteQuery(v_query,v_param)
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
      v_year          = request.form.get('p_year', None)
      v_month         = request.form.get('p_month', None)
      v_start_dt      = request.form.get('p_start_dt', None)
      v_week          = request.form.get('p_week', None)
      v_gubun         = request.form.get('p_gubun', None)
      v_document_num  = request.form.get('p_document_num', None)
      v_content       = request.form.get('p_content', None)
      v_title         = request.form.get('p_title', None)
      v_complete      = request.form.get('p_complete', None)
      v_type          = request.form.get('p_type', None)
  
      con     = mysql.connect()
      cursor  = con.cursor()
      query   = "INSERT INTO weekly_report (user_id ,started ,year ,month ,week ,gubun, document_num, title ,content ,complete ,type)"
      query   +="VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
      values  = (v_user_id ,v_start_dt ,v_year ,v_month ,v_week ,v_gubun ,v_document_num , v_content ,v_title ,v_complete ,v_type)
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
      v_complete      = request.form.get('p_complete', None)
      v_type          = request.form.get('p_type', None)
  
      con     = mysql.connect()
      cursor  = con.cursor()
      query   = "UPDATE weekly_report SET gubun = %s ,document_num = %s ,content = %s ,title = %s ,complete = %s ,type = %s WHERE id = %s "
      values  = (v_gubun ,v_document_num , v_content ,v_title ,v_complete ,v_type ,v_id)
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
  app.run(host="0.0.0.0", port="5000" ,debug=True)

  #SELECT FLOOR((DATE_FORMAT(now(),'%d')+(DATE_FORMAT(DATE_FORMAT(now(),'%Y%m%01'),'%w')-1))/7)+1 WEEK_OF_MONTH;


