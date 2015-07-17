try {
	var conn = $.db.getConnection();
	var query = "{call \"_SYS_BIC\".\"demo_content.MessageMngmt.procedures/IS_USER_ADMIN\"(?)}";
	var pstsmt = conn.prepareCall(query);
	pstsmt.execute();
	var output = pstsmt.getString(1);
	pstsmt.close();
	conn.commit();
	conn.close();
	$.response.setBody(output);
} catch (e) {
	$.response.setBody(e.toString());
}