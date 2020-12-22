exports = async function(arg) {
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
  var room = await roomsCollection.findOne({ _id: arg.roomId }, { members: 1 });
  if (!room) throw("room not found");
  if (!room.members.includes(context.user.id)) throw("403: cannot push messages to this room");
  
  try {
    const result = await roomsCollection.updateOne(
      {
        _id: arg.roomId,
      },
      {
        $push: {
          messages: {
            _id: new BSON.ObjectId(),
            user: context.user.id,
            text: arg.text,
          }
        }
      }
    );
    return result;
  } catch (e) {
    console.log("sendMessage error: ", e);
    throw(Error("server error"));
  }
};