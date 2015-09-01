## api需修改的地方

1. getSeatInfo雖然可以拿到tmp_exit_time,但是頁面直接呈現時就需要暫離的資料,希望暫離的位置可以像getVancy一樣拿到,否則須對getSeatInfo query 800多次
2. getSeatInfo需要姓名資料
3. checkin我們嘗試多組學生證條碼,結果都是invalid user,希望能提供幾組正確的學生證條碼,以方便測試