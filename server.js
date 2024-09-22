
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  dest: './uploads/',
  fileFilter(req, file, cb) {
    if (!file) {
      return cb(null, false);
    }
    cb(null, true);
  }
});

app.post('/bfhl', upload.single('file_b64'), (req, res) => {
  const { data, file_b64 } = req.body;
  const userId = 'john_doe_17091999';
  const email = 'john@xyz.com';
  const rollNumber = 'ABCD123';

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const highestLowercaseAlphabet = alphabets.sort((a, b) => b.localeCompare(a))[0];

  let fileValid = false;
  let fileMimeType = '';
  let fileSizeKb = 0;

  if (file_b64) {
    const fileBuffer = Buffer.from(file_b64, 'base64');
    fileValid = true;
    fileMimeType = fileBuffer.mime();
    fileSizeKb = fileBuffer.size / 1024;
  }

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: [highestLowercaseAlphabet],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});