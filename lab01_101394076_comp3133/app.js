const fs = require('fs');
const csv = require('csv-parser');

// Function to filter and write data to a file
function filterAndWriteData(inputFile, filterCountry, outputFileName) {
  const outputFilePath = `${__dirname}/${outputFileName}`;
  const writeStream = fs.createWriteStream(outputFilePath);

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
      if (row.country === filterCountry) {
        writeStream.write(`${JSON.stringify(row)}\n`);
      }
    })
    .on('end', () => {
      writeStream.end();
      console.log(`Filtered data for ${filterCountry} written to ${outputFileName}`);
    });
}

// Task: Delete existing files (if any)
if (fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt', (err) => {
        if (err) console.log(err);
        console.log('Deleted canada.txt');
      });      
}

if (fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt', (err) => {
        if (err) console.log(err);
        console.log('Deleted usa.txt');
      });
}

// Task: Filter data for Canada and write to canada.txt
filterAndWriteData('input_countries.csv', 'Canada', 'canada.txt');

// Task: Filter data for United States and write to usa.txt
filterAndWriteData('input_countries.csv', 'United States', 'usa.txt');
