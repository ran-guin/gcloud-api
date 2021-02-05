module.exports = {
  build (config) {
    var table = config.table;
    var fields = '*';

    if (config.fields) {
      fields = config.fields.join(', ');
    }

    var query = 'SELECT ' 
      + fields 
      + ' from `' 
      + table + '`';

    console.log('built query: ' + query);
    return query;
  }
}

