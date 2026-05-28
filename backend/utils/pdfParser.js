const pdfParse = require('pdf-parse');

async function parseResume(buffer) {
  try {
    const data = await pdfParse(buffer);

    let text = data.text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();

    console.log(`✅ Extracted ${text.length} characters from PDF`);

    return text;

  } catch (error) {
    console.error('PDF parse error:', error);

    throw new Error(
      'Failed to parse PDF. The file may be corrupted or password-protected.'
    );
  }
}

module.exports = { parseResume };