exports = async function(){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    var doc = collection.findOne({owner_id: context.user.id});

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  
  var roomsCollection = context.services.get("mongodb-atlas").db("chatrooms").collection("rooms");
  var rooms = await roomsCollection.find({"members": context.user.id}, {members: 1}).toArray();
  
  var contactsOfUser = [];
  
  for (var membersList of rooms.map(room => room.members)) {
    for (var member of membersList) {
      if (!contactsOfUser.includes(member)) {
        contactsOfUser.push(member);
      }
    }
  }
  
  return contactsOfUser;
};