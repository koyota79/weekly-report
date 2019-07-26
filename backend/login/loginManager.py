from flaskext.mysql import MySQL

class loginManager() :
    def __init__(self ):
        self.user_id    = ""
        self.password   = ""
    
    def loginCheck(self ,cux ,user_id ,password) :
        #v_result = null
        try :
            print("::::loginCheck:::::")
            cur = cux.cursor()
            v_query  = "select count(1) ,name ,levels ,part ,commute from member where user_id =%s and password=%s and use_yn = 'Y' "
            v_param  = (user_id ,password)
            cur.execute(v_query, v_param)
            record = cur.fetchone()
            v_result = record
        except Exception as e:  
            print("Exception ::login")
            print(e)

        return v_result