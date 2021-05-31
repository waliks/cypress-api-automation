export const deleteUserSchema = {
    "$id": "deleteUserSchema",
    "type": "object",
    "properties": {
      "code": {
        "type": "integer"
      },
      "meta": {
        "type": "null"
      },
      "data": {
        "type": "null"
      }
    },
    "required": [
      "code",
      "meta",
      "data"
    ]
}