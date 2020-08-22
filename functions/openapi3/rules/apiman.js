import {baseRules} from "./index"

const customRules = {
  "info-description": {
    "description": "Description must be present and non-empty.",
    "recommended": true,
    "type": "style",
    "given": "$",
    "then": {
      "field": "info.description",
      "function": "truthy"
    }
  },
}

export const apimanRules = Object.assign({}, baseRules, customRules)
