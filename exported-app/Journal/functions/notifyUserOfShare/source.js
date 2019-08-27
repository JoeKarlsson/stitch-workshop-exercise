exports = function(sharedWithEmail) {
  const ses = context.services.get("aws-ses");

  return ses.send({
    toAddress: sharedWithEmail,
    fromAddress: context.values.get("journalEmailAddress"),
    subject: "New Daily Journal Share!",
    body: "Someone shared a journal entry with you!"
  });
};
