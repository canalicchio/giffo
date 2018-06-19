import { readFile } from "fs";
readFile('hoge', 'utf-8', (err, content) => {
  if (!err) {
      console.log(content);
  }
});
