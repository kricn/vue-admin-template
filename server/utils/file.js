const fs = require('fs');
const path = require('path');

const mergeFile = (filePath, files, writer) => {
  return new Promise ((resolve, reject) => {
    function merge (filePath, files, writer) {
      if (!files.length) {
        console.log('合并完成')
        // try {
        //   fs.rmdirSync(filePath)
        // } catch(e) {}
        writer.end()
        return resolve()
      }
      const currentFile = path.resolve(filePath, files.shift())
      const reader = fs.createReadStream(currentFile)
      reader.pipe(writer, { end: false })
      reader.on('end', () => {
        // fs.unlink(currentFile, err => {
        //   merge(filePath, files, writer)
        // })
        merge(filePath, files, writer)
      })
      reader.on('error', e => {
        reject(e)
      })
    }
    merge(filePath, files, writer)
  })
}

module.exports = {
  mergeFile
}