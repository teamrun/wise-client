
let ImageFields = `
  url
  width
  height
`;

// let graphqlAPI = 'http://chenllos.com:9016/graphql'
let graphqlAPI = 'http://localhost:9016/graphql'

module.exports = {
  dashboard: (user, opt) => {
    var params = `user: "${user}", limit: ${opt.limit}`;
    if(opt.sinceId){
      params += `, sinceId: ${opt.sinceId}`;
    }
    if(opt.offset){
      params += `, offset: ${opt.offset}`;
    }
let str = `{
  dashboard(${params}){
    # String
    id
    # String
    blog_name
    # String
    post_url
    # String
    type
    # Int
    timestamp
    # String
    date
    # String
    format
    # String
    reblog_key
    # [String]
    tags
    # String
    state
    # String
    title
    # String
    body
    # [PostPhoto]
    photos{
      caption
      thumbnail{
        ${ImageFields}
      }
      original_size{
        ${ImageFields}
      }
    }
    # String
    caption
  }
}`;

    let data = new FormData();
    data.append('query', str);
    return fetch(graphqlAPI, {
      method: 'POST',
      body: data
    })
    .then((resp) => {
      return resp.json();
    })
    .then((d) => {
      return d.data.dashboard;
    })
  }
}
