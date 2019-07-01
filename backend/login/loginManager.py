from flaskext.mysql import MySQL

class loginManager() :
    def __init__(self ):
        self.user_id    = ""
        self.password   = ""
    
    def loginCheck(self ,cux ,user_id ,password) :
        try :
            print("::::loginCheck:::::")
            cur = cux.cursor()
            v_query  = "select count(1) from member where user_id =%s and password=%s "
            v_param  = (user_id ,password)
            cur.execute(v_query, v_param)
            record = cur.fetchone()
            print(record)
            if record[0] > 0 :
                result = "Y"
            else :
                result = "N"
        except Exception as e:  
            print("Exception ::")
            print(e)
            result = "N"

        return result