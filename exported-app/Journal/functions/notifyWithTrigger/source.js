exports = function(changeEvent){
  const { updateDescription, fullDocument } = changeEvent;
  const updatedFields = Object.keys(updateDescription.updatedFields);

  const sharedWithFieldWasUpdated = updatedFields.some(
    field => /sharedWith/.test(field)
  );


  if(sharedWithFieldWasUpdated) {
    const { sharedWith, author, title } = fullDocument;

    const sharedWithEmail = sharedWith[sharedWith.length - 1];
    if(!sharedWithEmail) { return }

    const ses = context.services.get("aws-ses");
    const body = `${author} shared their entry, ${title}, with you!`;

    ses.send({
      "toAddress": sharedWithEmail,
      "fromAddress": context.values.get("journalEmailAddress"),
      "body": body,
      "subject": "New Daily Journal Share!"
    })
    .catch(console.error);
  }
};
