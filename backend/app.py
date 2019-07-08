
from flask import Flask, request ,session , url_for ,escape ,redirect ,jsonify
from flaskext.mysql import MySQL
from flask_cors import CORS
import logging
from login.loginManager import loginManager
from configuration  import config
import os
import json
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token ,get_jwt_identity)
import datetime

# import socket
# _socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# _socket.connect(('26.2.111.149', 5000))
#https://pynative.com/python-mysql-select-query-to-fetch-data/


app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.config['MYSQL_DATABASE_HOST']     = config.DATABASE_CONFIG['MYSQL_DATABASE_HOST'] #'127.0.0.1'
app.config['MYSQL_DATABASE_USER']     = config.DATABASE_CONFIG['MYSQL_DATABASE_USER'] #'root'
app.config['MYSQL_DATABASE_PASSWORD'] = config.DATABASE_CONFIG['MYSQL_DATABASE_PASSWORD'] #'akfldkelql!'
app.config['MYSQL_DATABASE_DB']       = config.DATABASE_CONFIG['MYSQL_DATABASE_DB']#'report'
app.config['MYSQL_DATABASE_PORT']     = config.DATABASE_CONFIG['MYSQL_DATABASE_PORT'] #3306
#app.config['SECRET_KEY'] = b'_5#y2L"F4Q8z\n\xec]/' #os.urandom(12)

#app.secret_key = os.urandom(12)
mysql.init_app(app)

app.config['JWT_SECRET_KEY'] = b'_5#y2L"F4Q8z\n\xec]/'
jwt = JWTManager(app)


logger = logging.getLogger("react_python")
logger.setLevel(logging.INFO)



def ExecuteQuery(sql,param):
  cur = mysql.connect().cursor()
  cur.execute(sql ,param)

  results = [dict((cur.description[i][0], value)
  for i, value in enumerate(row)) for row in cur.fetchall()]

  #results =  cur.fetchall()
  return results


@app.route('/'  , methods=['POST'])
@jwt_required
def index(): 
    logger.INFO("::::::index::::::::")
    app.logger.debug('second test message...')
    logging.warning('Watch out!') # will print a message to the console
    logging.info('I told you so') # will not print anything
    current_user = get_jwt_identity()
    print(current_user)
    response = {'token' : '' ,
                'user'  : {
                       'name'    : '',
                       'levels'  : 0 ,
                       'message' : ''  
                      }
    }
    return json.dumps(response)


@app.route('/login' , methods=['POST'])
def login():
      #app.secret_key = os.urandom(12)
      response = {}
      try :
        print(':::::::userLogin::::::::')
        if request.method == 'POST':
              v_userId        = request.form.get('p_userId', None)
              v_password      = request.form.get('p_password', None)

              
              logger.debug(v_userId)
              logger.debug(v_password)
              
              #LoginManager.loginCheck(v_userId ,v_password) 
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
              print("::retChk[0]::::"+ str(retChk[0]))
              
              if retChk[0] > 0 : 
                    user = {
                            'userId'  : v_userId,
                            'name'    : retChk[1],
                            'levels'  : retChk[2]              
                    }
                    #v_expires = datetime.datetime.now() + datetime.timedelta(days=0, seconds=30)
                    #print(v_expires)
                    v_expires = datetime.timedelta(seconds=int(config.SESSTION_TIME)) #seconds=10000
                    print(v_expires)
                    #datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=60) 
                    access_token = create_access_token(identity=user ,expires_delta=v_expires )  #expires_delta
                    response = {
                          'access_token' : access_token ,
                          'info'  : {
                                      'status'  :'S', 
                                      'message' : '로그인 성공.'
                                    } 
                    }
              else :         
                    response = {'access_token' : '' ,'info'  : { 'status' :'E' , 'message' : '등록된 아이디가 없습니다' }}                 
        else :
              response = {'access_token' : '' ,'info'  : { 'status' :'E' , 'message' : '잘못된 접근경로' }}   

      except Exception as e:  
             logger.debug("Exception_app_login" + str(e)) 
             response = {'access_token' : '' ,'info'  : { 'status' :'E' , 'message' : str(e) }}   

      return json.dumps(response)

@app.route('/logout')
def logout():
      session.clear()
      v_result = json.dumps({
         "loggedIn"  : "N" 
      })
      return v_result


@app.route('/weekly_report' ,methods=["GET" ,"POST"]) 
@jwt_required
def weeklyList():
      response ={}    
      auth_header = request.headers.get('Authorization') 
      print(auth_header)
      try:
        if request.method == 'POST':
            current_user = get_jwt_identity()
            print(current_user)
            print(current_user['userId'])



            v_week         = request.form.get('p_week', None)
            v_month        = request.form.get('p_month', None)
            v_start_dt     = request.form.get('p_start_dt', None)

            print(":::::::::::::::")
            print(v_month)
            print(v_start_dt)
            
            v_query = "select id, gubun, document_num, title ,content ,complete ,type from weekly_report where user_id =%s and started=%s "
            v_param = (current_user['userId'] ,v_start_dt)
            list = ExecuteQuery(v_query,v_param)
            response = { "result"   : "Y" , "LIST"     : list  , 'info'  : { 'status' :'S' , 'message' : '조회성공' }}
        else :
            response = {'result'    : 'N' ,'info'  : { 'status' :'E' , 'message' : '잘못된 접근경로' }}  
    
      except Exception as e: 
             print("Exception_app_login" + str(e)) 
             response = {'result' : 'N' ,'info'  : { 'status' :'E' , 'message' : str(e) }}  

      return json.dumps(response)  




@app.route('/weekly_report_insert' ,methods=["POST"])
@jwt_required
def insertWeeklyReport():
  if request.method == 'POST':

      current_user = get_jwt_identity()
      print(current_user)

      v_user_id       = current_user['userId'] #request.form.get('user_id', None)
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




@app.route('/getSelectBox' ,methods=["GET" ,"POST"]) 
def getSelectBoxList():
      response ={}    
      try:
        if request.method == 'POST':


            v_type        = request.form.get('p_type')
            v_menu        = request.form.get('p_menu')
            v_class       = request.form.get('p_class')            

            print(':::['+v_type + ':::::' + v_menu + ':::::' + v_class + ']:::')

            v_query   = "select * from cmn_code where "
            v_query  +="type = %s"
            v_param = (v_type,)

            if v_menu != '' :
              v_query +=" and menu=%s"
              v_param = v_param + (v_menu,)

            if v_class != '' :
              v_query +=" and class=%s"
              v_param = v_param + (v_class,)

            v_query +=" order by class ,orders"
          
            print(':::::v_query:::::' + v_query)

            list = ExecuteQuery(v_query ,v_param)
            response = {'result'   : 'Y' , 'LIST'     : list  , 'info'  : { 'status' :'S' , 'message' : '조회성공' }}
        else :
            response = {'result'    : 'N' ,'info'  : { 'status' :'E' , 'message' : '잘못된 접근경로' }}  
    
      except Exception as e: 
             print("Exception_app_login" + str(e)) 
             response = {'result' : 'N' ,'info'  : { 'status' :'E' , 'message' : str(e) }}  

      return json.dumps(response)  


if __name__ == '__main__':
  app.run(host="0.0.0.0", port="5000" ,debug=True)
  #SELECT FLOOR((DATE_FORMAT(now(),'%d')+(DATE_FORMAT(DATE_FORMAT(now(),'%Y%m%01'),'%w')-1))/7)+1 WEEK_OF_MONTH;


