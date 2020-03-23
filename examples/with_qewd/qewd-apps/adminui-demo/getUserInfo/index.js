module.exports = function(messageObj, session, send, finished) {

  let userDoc = this.db.use('demoUsers', 'by_id', messageObj.params.id);
  let record = userDoc.getDocument(true);
  if (!record.gender) record.gender = 'x';
  if (!record.userType) record.userType = 'x';
  finished({record: record});

};