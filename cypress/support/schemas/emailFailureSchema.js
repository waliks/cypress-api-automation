export const emailFailureSchema = {
    "$id": "emailFailureSchema",
    "type": "object",
    "properties": {
      "code": {
        "type": "integer"
      },
      "meta": {
        "type": "null"
      },
      "data": {
        "type": "array",
        "items": [
          {
            "type": "object",
            "properties": {
              "field": {
                "type": "string"
              },
              "message": {
                "type": "string"
              }
            },
            "required": [
              "field",
              "message"
            ]
          }
        ]
      }
    },
    "required": [
      "code",
      "meta",
      "data"
    ]
}