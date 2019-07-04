from flaskext.mysql import MySQL

class loginManager() :
    def __init__(self ):
        self.user_id    = ""
        self.password   = ""
    
    def loginCheck(self ,cux ,user_id ,password) :
        v_result = null
        try :
            print("::::loginCheck:::::")
            cur = cux.cursor()
            v_query  = "select count(1) ,name ,levels from member where user_id =%s and password=%s "
            v_param  = (user_id ,password)
            cur.execute(v_query, v_param)
            record = cur.fetchone()
            print(record)
            v_result = record
        except Exception as e:  
            print("Exception ::")
            print(e)

        return v_result