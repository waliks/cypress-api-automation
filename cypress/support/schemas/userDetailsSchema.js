export const userDetailsSchema = {
        "$id": "userDetailsSchema",
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
              "id": {
                "type": "integer"
              },
              "name": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "gender": {
                "type": "string"
              },
              "status": {
                "type": "string"
              },
              "created_at": {
                "type": "string"
              },
              "updated_at": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "name",
              "email",
              "gender",
              "status",
              "created_at",
              "updated_at"
            ]
          }
        },
        "required": [
          "code",
          "meta",
          "data"
        ]
}