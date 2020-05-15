export const baseRules = {
  "operation-2xx-response": {
    "description": "Operation must have at least one `2xx` response.",
    "recommended": true,
    "type": "style",
    "given": "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
    "then": {
      "field": "responses",
      "function": "oasOp2xxResponse"
    }
  },
  "oas2-operation-formData-consume-check": {
    "description": "Operations with an `in: formData` parameter must include `application/x-www-form-urlencoded` or `multipart/form-data` in their `consumes` property.",
    "recommended": true,
    "formats": ["oas2"],
    "type": "validation",
    "given": "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
    "then": {
      "function": "oasOpFormDataConsumeCheck"
    }
  },
  "operation-operationId-unique": {
    "description": "Every operation must have a unique `operationId`.",
    "recommended": true,
    "type": "validation",
    "severity": 0,
    "given": "$",
    "then": {
      "function": "oasOpIdUnique"
    }
  },
  "operation-parameters": {
    "description": "Operation parameters are unique and non-repeating.",
    "recommended": true,
    "type": "validation",
    "given": "$",
    "then": {
      "function": "oasOpParams"
    }
  },
  "operation-tag-defined": {
    "description": "Operation tags should be defined in global tags.",
    "recommended": true,
    "type": "validation",
    "given": "$",
    "then": {
      "function": "oasTagDefined"
    }
  },
  "path-params": {
    "description": "Path parameters should be defined and valid.",
    "message": "{{error}}",
    "type": "validation",
    "severity": 0,
    "recommended": true,
    "given": "$",
    "then": {
      "function": "oasPathParam"
    }
  },
  "contact-properties": {
    "description": "Contact object should have `name`, `url` and `email`.",
    "recommended": false,
    "type": "style",
    "given": "$.info.contact",
    "then": [
      {
        "field": "name",
        "function": "truthy"
      },
      {
        "field": "url",
        "function": "truthy"
      },
      {
        "field": "email",
        "function": "truthy"
      }
    ]
  },
  "info-contact": {
    "description": "Info object should contain `contact` object.",
    "recommended": true,
    "type": "style",
    "given": "$",
    "then": {
      "field": "info.contact",
      "function": "truthy"
    }
  },
  "info-description": {
    "description": "OpenAPI object info `description` must be present and non-empty string.",
    "recommended": true,
    "type": "style",
    "given": "$",
    "then": {
      "field": "info.description",
      "function": "truthy"
    }
  },
  "info-license": {
    "description": "OpenAPI object `info` should contain a `license` object.",
    "recommended": false,
    "type": "style",
    "given": "$",
    "then": {
      "field": "info.license",
      "function": "truthy"
    }
  },
  "license-url": {
    "description": "License object should include `url`.",
    "recommended": false,
    "type": "style",
    "given": "$",
    "then": {
      "field": "info.license.url",
      "function": "truthy"
    }
  },
  "no-eval-in-markdown": {
    "description": "Markdown descriptions should not contain `eval(`.",
    "recommended": true,
    "type": "style",
    "given": "$..*",
    "then": [
      {
        "field": "description",
        "function": "pattern",
        "functionOptions": {
          "notMatch": "eval\\("
        }
      },
      {
        "field": "title",
        "function": "pattern",
        "functionOptions": {
          "notMatch": "eval\\("
        }
      }
    ]
  },
  "no-script-tags-in-markdown": {
    "description": "Markdown descriptions should not contain `<script>` tags.",
    "recommended": true,
    "type": "style",
    "given": "$..*",
    "then": [
      {
        "field": "description",
        "function": "pattern",
        "functionOptions": {
          "notMatch": "<script"
        }
      },
      {
        "field": "title",
        "function": "pattern",
        "functionOptions": {
          "notMatch": "<script"
        }
      }
    ]
  },
  "openapi-tags-alphabetical": {
    "description": "OpenAPI object should have alphabetical `tags`.",
    "recommended": false,
    "type": "style",
    "given": "$",
    "then": {
      "field": "tags",
      "function": "alphabetical",
      "functionOptions": {
        "keyedBy": "name"
      }
    }
  },
  "openapi-tags": {
    "description": "OpenAPI object should have non-empty `tags` array.",
    "recommended": true,
    "type": "style",
    "given": "$",
    "then": {
      "field": "tags",
      "function": "schema",
      "functionOptions": {
        "schema": {
          "type": "array",
          "minItems": 1
        }
      }
    }
  },
  "operation-default-response": {
    "description": "Operations must have a default response.",
    "recommended": false,
    "type": "style",
    "given": "$.paths.*.*.responses",
    "then": {
      "field": "default",
      "function": "truthy"
    }
  },
  "operation-description": {
    "description": "Operation `description` must be present and non-empty string.",
    "recommended": true,
    "type": "style",
    "given": "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
    "then": {
      "field": "description",
      "function": "truthy"
    }
  },
  "operation-operationId": {
    "description": "Operation should have an `operationId`.",
    "recommended": true,
    "type": "style",
    "given": "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
    "then": {
      "field": "operationId",
      "function": "truthy"
    }
  },
  "operation-operationId-valid-in-url": {
    "description": "operationId may only use characters that are valid when used in a URL.",
    "recommended": true,
    "type": "validation",
    "given": "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
    "then": {
      "field": "operationId",
      "function": "pattern",
      "functionOptions": {
        "match": "^[A-Za-z0-9-._~:/?#\\[\\]@!\\$&'()*+,;=]*$"
      }
    }
  },
  "operation-singular-tag": {
    "description": "Operation may only have one tag.",
    "recommended": false,
    "type": "style",
    "given": "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
    "then": {
      "field": "tags",
      "function": "length",
      "functionOptions": {
        "max": 1
      }
    }
  },
  "operation-tags": {
    "description": "Operation should have non-empty `tags` array.",
    "recommended": true,
    "type": "style",
    "given": "$.paths.*[?( @property === 'get' || @property === 'put' || @property === 'post' || @property === 'delete' || @property === 'options' || @property === 'head' || @property === 'patch' || @property === 'trace' )]",
    "then": {
      "field": "tags",
      "function": "truthy"
    }
  },
  "path-declarations-must-exist": {
    "description": "Path parameter declarations cannot be empty, ex.`/given/{}` is invalid.",
    "recommended": true,
    "type": "style",
    "given": "$.paths",
    "then": {
      "field": "@key",
      "function": "pattern",
      "functionOptions": {
        "notMatch": "{}"
      }
    }
  },
  "path-keys-no-trailing-slash": {
    "description": "paths should not end with a slash.",
    "recommended": true,
    "type": "style",
    "given": "$.paths",
    "then": {
      "field": "@key",
      "function": "pattern",
      "functionOptions": {
        "notMatch": ".+\\/$"
      }
    }
  },
  "path-not-include-query": {
    "description": "given keys should not include a query string.",
    "recommended": true,
    "type": "style",
    "given": "$.paths",
    "then": {
      "field": "@key",
      "function": "pattern",
      "functionOptions": {
        "notMatch": "\\?"
      }
    }
  },
  "tag-description": {
    "description": "Tag object should have a `description`.",
    "recommended": false,
    "type": "style",
    "given": "$.tags[*]",
    "then": {
      "field": "description",
      "function": "truthy"
    }
  },
  "no-$ref-siblings": {
    "description": "Property cannot be placed among $ref",
    "message": "{{error}}",
    "type": "validation",
    "severity": 0,
    "recommended": true,
    "resolved": false,
    "given": "$",
    "then": {
      "function": "refSiblings"
    }
  },
  "typed-enum": {
    "description": "Enum values should respect the specified type.",
    "message": "{{error}}",
    "recommended": true,
    "type": "validation",
    "given": "$..[?(@.enum && @.type)]",
    "then": {
      "function": "typedEnum"
    }
  },
  "oas2-api-host": {
    "description": "OpenAPI `host` must be present and non-empty string.",
    "recommended": true,
    "formats": ["oas2"],
    "type": "style",
    "given": "$",
    "then": {
      "field": "host",
      "function": "truthy"
    }
  },
  "oas2-api-schemes": {
    "description": "OpenAPI host `schemes` must be present and non-empty array.",
    "recommended": true,
    "formats": ["oas2"],
    "type": "style",
    "given": "$",
    "then": {
      "field": "schemes",
      "function": "schema",
      "functionOptions": {
        "schema": {
          "items": {
            "type": "string"
          },
          "minItems": 1,
          "type": "array"
        }
      }
    }
  },
  "oas2-host-not-example": {
    "description": "Host URL should not point at example.com.",
    "recommended": false,
    "formats": ["oas2"],
    "given": "$",
    "type": "style",
    "then": {
      "field": "host",
      "function": "pattern",
      "functionOptions": {
        "notMatch": "example\\.com"
      }
    }
  },
  "oas2-host-trailing-slash": {
    "description": "Server URL should not have a trailing slash.",
    "recommended": true,
    "formats": ["oas2"],
    "given": "$",
    "type": "style",
    "then": {
      "field": "host",
      "function": "pattern",
      "functionOptions": {
        "notMatch": "/$"
      }
    }
  },
  "oas2-parameter-description": {
    "description": "Parameter objects should have a `description`.",
    "recommended": false,
    "formats": ["oas2"],
    "given": "$..[?(@parentProperty === 'parameters' && @.in)]",
    "type": "style",
    "then": {
      "field": "description",
      "function": "truthy"
    }
  },
  "oas2-operation-security-defined": {
    "description": "Operation `security` values must match a scheme defined in the `securityDefinitions` object.",
    "recommended": true,
    "formats": ["oas2"],
    "type": "validation",
    "given": "$",
    "then": {
      "function": "oasOpSecurityDefined",
      "functionOptions": {
        "schemesPath": [
          "securityDefinitions"
        ]
      }
    }
  },
  "oas2-valid-parameter-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "recommended": true,
    "formats": ["oas2"],
    "severity": 0,
    "type": "validation",
    "given": "$..parameters..[?(@.in == 'body')]..[?(@property !== 'properties' && @.example && ( @.type || @.format || @.$ref ))]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$",
        "oasVersion": 2
      }
    }
  },
  "oas2-valid-definition-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "recommended": true,
    "formats": ["oas2"],
    "severity": 0,
    "type": "validation",
    "given": "$..definitions..[?(@property !== 'properties' && @.example && (@.type || @.format || @.$ref))]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$",
        "oasVersion": 2
      }
    }
  },
  "oas2-anyOf": {
    "description": "OpenAPI v3 keyword `anyOf` detected in OpenAPI v2 document.",
    "message": "anyOf is not available in OpenAPI v2, it was added in OpenAPI v3",
    "recommended": true,
    "formats": ["oas2"],
    "type": "validation",
    "given": "$..[?(@.anyOf)]",
    "then": {
      "field": "anyOf",
      "function": "undefined"
    }
  },
  "oas2-oneOf": {
    "description": "OpenAPI v3 keyword `oneOf` detected in OpenAPI v2 document.",
    "message": "oneOf is not available in OpenAPI v2, it was added in OpenAPI v3",
    "recommended": true,
    "formats": ["oas2"],
    "type": "validation",
    "given": "$..[?(@.oneOf)]",
    "then": {
      "field": "oneOf",
      "function": "undefined"
    }
  },
  "oas2-schema": {
    "description": "Validate structure of OpenAPI v2 specification.",
    "message": "{{error}}.",
    "recommended": true,
    "formats": ["oas2"],
    "severity": 0,
    "type": "validation",
    "given": "$",
    "then": {
      "function": "oasDocumentSchema",
      "functionOptions": {
        "allErrors": true,
        "schema": {
          "$ref": "./schemas/schema.oas2.json"
        }
      }
    }
  },
  "oas2-unused-definition": {
    "description": "Potentially unused definition has been detected.",
    "recommended": true,
    "resolved": false,
    "formats": ["oas2"],
    "type": "style",
    "given": "$.definitions",
    "then": {
      "function": "unreferencedReusableObject",
      "functionOptions": {
        "reusableObjectsLocation": "#/definitions"
      }
    }
  },
  "oas3-api-servers": {
    "description": "OpenAPI `servers` must be present and non-empty array.",
    "recommended": true,
    "formats": ["oas3"],
    "type": "style",
    "given": "$",
    "then": {
      "field": "servers",
      "function": "schema",
      "functionOptions": {
        "schema": {
          "items": {
            "type": "object"
          },
          "minItems": 1,
          "type": "array"
        }
      }
    }
  },
  "oas3-examples-value-or-externalValue": {
    "description": "Examples should have either a `value` or `externalValue` field.",
    "recommended": true,
    "formats": ["oas3"],
    "type": "style",
    "given": [
      "$.components.examples.*",
      "$.paths..content.*.examples.*",
      "$.components..content.*.examples.*",
      "$.paths..parameters.*.examples.*",
      "$.components..parameters.*.examples.*",
      "$.paths..headers.*.examples.*",
      "$.components..headers.*.examples.*"
    ],
    "then": {
      "function": "xor",
      "functionOptions": {
        "properties": [
          "externalValue",
          "value"
        ]
      }
    }
  },
  "oas3-operation-security-defined": {
    "description": "Operation `security` values must match a scheme defined in the `components.securitySchemes` object.",
    "recommended": true,
    "formats": ["oas3"],
    "type": "validation",
    "given": "$",
    "then": {
      "function": "oasOpSecurityDefined",
      "functionOptions": {
        "schemesPath": [
          "components",
          "securitySchemes"
        ]
      }
    }
  },
  "oas3-parameter-description": {
    "description": "Parameter objects should have a `description`.",
    "recommended": false,
    "formats": ["oas3"],
    "type": "style",
    "given": "$..[?(@parentProperty !== 'links' && @.parameters)]['parameters'].[?(@.in)]",
    "then": {
      "field": "description",
      "function": "truthy"
    }
  },
  "oas3-server-not-example.com": {
    "description": "Server URL should not point at example.com.",
    "recommended": false,
    "formats": ["oas3"],
    "type": "style",
    "given": "$.servers[*].url",
    "then": {
      "function": "pattern",
      "functionOptions": {
        "notMatch": "example\\.com"
      }
    }
  },
  "oas3-server-trailing-slash": {
    "description": "Server URL should not have a trailing slash.",
    "recommended": true,
    "formats": ["oas3"],
    "type": "style",
    "given": "$.servers[*].url",
    "then": {
      "function": "pattern",
      "functionOptions": {
        "notMatch": "/$"
      }
    }
  },
  "oas3-valid-oas-parameter-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "recommended": true,
    "severity": 0,
    "type": "validation",
    "given": "$..parameters..[?(@.example && @.schema)]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$.schema",
        "oasVersion": 3
      }
    }
  },
  "oas3-valid-oas-header-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "recommended": true,
    "severity": 0,
    "formats": ["oas3"],
    "type": "validation",
    "given": "$..headers..[?(@.example && @.schema)]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$.schema",
        "oasVersion": 3
      }
    }
  },
  "oas3-valid-oas-content-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "recommended": true,
    "severity": 0,
    "formats": ["oas3"],
    "type": "validation",
    "given": "$..content..[?(@.example && @.schema)]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$.schema",
        "oasVersion": 3
      }
    }
  },
  "oas3-valid-parameter-schema-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "recommended": true,
    "severity": 0,
    "formats": ["oas3"],
    "type": "validation",
    "given": "$..parameters..[?(@property !== 'properties' && @.example && (@.type || @.format || @.$ref))]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$",
        "oasVersion": 3
      }
    }
  },
  "oas3-valid-header-schema-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "recommended": true,
    "severity": 0,
    "formats": ["oas3"],
    "type": "validation",
    "given": "$..headers..[?(@property !== 'properties' && @.example && (@.type || @.format || @.$ref))]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$",
        "oasVersion": 3
      }
    }
  },
  "oas3-valid-schema-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "severity": 0,
    "formats": ["oas3"],
    "recommended": true,
    "type": "validation",
    "given": "$.components.schemas..[?(@property !== 'properties' && @.example && (@.type || @.format || @.$ref))]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$",
        "oasVersion": 3
      }
    }
  },
  "oas3-valid-content-schema-example": {
    "description": "Examples must be valid against their defined schema.",
    "message": "{{error}}",
    "severity": 0,
    "formats": ["oas3"],
    "recommended": true,
    "type": "validation",
    "given": "$..content..[?(@property !== 'properties' && @.example && (@.type || @.format || @.$ref))]",
    "then": {
      "function": "schemaPath",
      "functionOptions": {
        "field": "example",
        "schemaPath": "$",
        "oasVersion": 3
      }
    }
  },
  "oas3-schema": {
    "description": "Validate structure of OpenAPI v3 specification.",
    "message": "{{error}}.",
    "severity": 0,
    "formats": ["oas3"],
    "recommended": true,
    "type": "validation",
    "given": "$",
    "then": {
      "function": "oasDocumentSchema",
      "functionOptions": {
        "allErrors": true,
        "schema": {
          "$ref": "./schemas/schema.oas3.json"
        }
      }
    }
  },
  "oas3-unused-components-schema": {
    "description": "Potentially unused components schema has been detected.",
    "recommended": true,
    "formats": ["oas3"],
    "type": "style",
    "resolved": false,
    "given": "$.components.schemas",
    "then": {
      "function": "unreferencedReusableObject",
      "functionOptions": {
        "reusableObjectsLocation": "#/components/schemas"
      }
    }
  }
}
