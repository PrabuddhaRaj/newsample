function createUser() {
	var output;
	try {
		var conn = $.db.getConnection();
		var uname = $.request.parameters.get("Username");
		var passwd = $.request.parameters.get("Password");
		var isAdmin = $.request.parameters.get("isAdmin");

		var cstmt = conn.prepareCall("{call SINGHPRAB.CREATE_USER(?,?,?,?)}");
		cstmt.setString(1, uname);
		cstmt.setString(2, passwd);
		cstmt.setString(3, isAdmin);
		cstmt.execute();
		output = cstmt.getString(4);
		cstmt.close();
		conn.commit();
		conn.close();
	} catch (e) {

		$.response.setBody(e.toString());

	}
	return output;
}

try {
	var cmd = $.request.parameters.get("CMD");
	var returnBody;
	switch (cmd) {
	case 'create':
		returnBody = createUser();
		break;
	default:
		$.response.status = $.net.http.METHOD_NOT_ALLOWED;
		$.response.setBody("The specified HTTP method is not supported");
	}
	$.response.setBody(returnBody);
} catch (e) {
	$.response.setBody(e.toString());
}
