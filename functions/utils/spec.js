import {contentTypes as ValidContentTypes, requestContentTypes} from "./commons"
import {intersection, isObject, toPairs, join} from "lodash"

export const X_APIMAN_ID = 'x-apiman-id'

export const getPathInfo = (spec, pathid) => {
  let pathInfo, path;
  if(!spec || !pathid) return {path, pathInfo}
  for(let _path in spec.paths) {
    if(spec.paths[_path][X_APIMAN_ID] == pathid) {
      path = _path
      pathInfo = spec.paths[_path]
      break;
    }
  }
  return {path, pathInfo}
}

export const defaults = {
  operation: {
    description: null,
    parameters: [],
    requestBody: {
      contentType: null,
      examples: {},
      schema: {},
      description: null,
    },
    responses: [],
  },
}

export const getNullableOfSchema = schemaType => {
  let value = null
  switch(schemaType) {
    case 'string':
      value = ''; break;
    case 'integer':
      value = 0; break;
    case 'object':
      value = {}; break;
    case 'array':
      value = []; break;
    default: break;
  }
  return value
}

export const toSpecParam = (params, _in) => {
  return params.map(item => {
    return {
      in: _in,
      name: item['key'],
      description: item['description'],
      example: item['value'],
      required: item['required'],
      schema: {type: 'string'}, //@TODO Infer Schema type from example
    }
  })
}

export const toNativeParam = (params, _in) => {
  return params.filter(p => p['in'] == _in).map(item => {
    return {
      key: item.name,
      value: item.example || (item.schema ? getNullableOfSchema(item.schema.type) : null),
      required: item.required,
      description: item.description,
    }
  })
}

// export const schemaToKeyVal = (schema, examples) => {
//   if(!schema || !isObject(schema)) return {}
//   for(key in schema) {
//     let value = Object.keys()
//   }
//   let formType = schema.type
//   for(let example of examples) {
//     //if(example[])
//   }
// }

export const toNativeBody = body => {
  body = body || {}
  let parsedBody = Object.assign({}, defaults.operation.requestBody, body.description || null)
  if(!body.content) return parsedBody
  let contentType = intersection(Object.keys(body.content), requestContentTypes)
  if(contentType.length) {
    parsedBody.contentType = contentType[0]
  }
  parsedBody.schema = body.content[contentType].schema
  parsedBody.examples = body.content[contentType].examples || (
    body.content[contentType].example ?  {'example-1': body.content[contentType].example} : {}
  )
  return parsedBody
}

// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#parameterStyle
export const unserializeParameter = (example, parameters) => {
  if(!parameters) return example
  //let schemaType = (parameters.schema && parameters.schema.type) || null
  let style = parameters.style || 'simple'
  let explode = parameters.explode || true
  let joinFieldsBy, joinPairsBy;
  switch(style) {
    case 'form':
      joinFieldsBy = explode == true ? '&' : ','
      joinPairsBy = explode == true ? '=' : ','
      break;
    case 'simple':
      joinFieldsBy = ','
      joinPairsBy = explode == true ? '=' : ','
      break;
    default:
      joinFieldsBy = explode == true ? '&' : ','
      joinPairsBy = explode == true ? '=' : ','
      break;
  }
  return join(toPairs(example).map(item => item.join(joinPairsBy)), joinFieldsBy)
}
// export const toNativeArray = (parameters, _in) => {
//   let _parameters = {}
//   console.log('ppl', parameters)
//   for(param of parameters) {
//     if(_in && (param['in'] != _in)) continue;
//     if(param['in'] && !_parameters[param['in']]){
//       _parameters[param['in']] = []
//     }
//     let term = {}
//     term[param['name']] = param['example'] || getNullableOfSchema(
//       param['schema']['type']
//     )
//     _parameters[param['in']].push(term)
//   }
//   return _parameters
// }
