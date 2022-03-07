export default function getFromSearch(key:any, query = '') {
    query = query || location.search || '';
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)', 'i'),
      results = regex.exec(query);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  