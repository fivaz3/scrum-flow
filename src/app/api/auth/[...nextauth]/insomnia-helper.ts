import fs from 'fs';

export function saveInsomniaConfig(access_token: string) {
  const pathToFile = 'insomnia-config.json';
  fs.readFile(pathToFile, 'utf8', function (err, configString) {
    if (err) {
      console.log(err);
      return;
    }

    try {
      // Parse the JSON data
      const config = JSON.parse(configString);

      // Modify the data
      config.access_token = access_token;

      // Write the modified data back to the file
      fs.writeFile(pathToFile, JSON.stringify(config, null, 2), function (err) {
        if (err) {
          console.log(err);
          return;
        }
      });
    } catch (error) {
      // configString is sometimes an empty string which provokes SyntaxError when executing JSON.parse(configString)
      if (!(error instanceof SyntaxError)) {
        console.log('unknown error when saving insomnia config', error);
        throw error;
      }
    }
  });
}
