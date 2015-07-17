var content = $.request.entities[0].body.asString();

var conn = $.db.getConnection();
var query = "{call SINGHPRAB.CREATE_MSG(?,?,?,?,?,?,?,?,?,?,?,?)}";
var st = conn.prepareCall(query);
try{
	
	var nextline = content.split(/\r\n|\n/);
	var lines;
	var entries;
	var cells;
	var output;
	var errorRecord = '';
	for(lines=1;lines<nextline.length-1;lines++ ){
		entries = nextline[lines].split(',');
		cells = entries.splice(0,8);
		st.setString(1,cells[0]);
		st.setString(2,cells[1]);
		st.setString(3,cells[2]);
		st.setString(4,cells[3]);
		st.setString(5,cells[4]);
		st.setString(6,cells[5]);
		st.setString(7,cells[6]);
		st.setString(8,cells[7]);
		st.setString(9,cells[8]);
		st.setString(10,cells[9]);
		st.execute();
		output = st.getString(11);
		if(output != 'msg added')
		    errorRecord += cells[0] + ' , ';
		
	}
	conn.commit();
	st.close();
	conn.close();
	$.response.setBody("Messages added successfully");
}catch(e){
	if(st!==null){
		st.close();
	}
	if(conn!==null){
		conn.close();
	}
	$.response.setBody("Error"+e);
}