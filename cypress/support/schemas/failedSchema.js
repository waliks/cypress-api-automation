export const failedSchema = {
    "$id": "failedSchema",
    "type": "object",
    "properties": {
      "code": {
        "type": "integer"
      },
      "meta": {
        "type": "null"
      },
      "data": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          }
        },
        "required": [
          "message"
        ]
      }
    },
    "required": [
      "code",
      "meta",
      "data"
    ]
}