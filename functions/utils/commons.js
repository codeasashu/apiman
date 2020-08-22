export const MODE_EDIT = 'edit'
export const MODE_RUN = 'run'

export const statusCodes = [
    {code: 200, text: "200: OK"},
    {code: 201, text: "201: Created"}
]

export const contentTypes = [
    {type: 'json', text: 'application/json'},
    {type: 'json', text: 'application/vnd.api+json'},
    {type: 'text', text: 'text/plain'},
    {type: 'html', text: 'text/html'},
    {type: 'xml', text: 'application/xml'},
]


export const requestContentTypes = [...contentTypes,
    {type: 'form', text: 'application/x-www-form-urlencoded', table: true},
    {type: 'form', text: 'multipart/form-data', table: true},
]

export const methods = [
    'get',
    'post',
    'put',
    'delete',
    'patch',
    'head'
]
