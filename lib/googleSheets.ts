import { google } from 'googleapis';

export async function saveToGoogleSheet(extractedData: any) {
  try {
    // Load environment variables
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SHEET_ID) {
      throw new Error('Missing Google Sheets API credentials.');
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      GOOGLE_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Extract required fields from the data
    const { personal_info, education, qualifications, projects, cv_public_link } = extractedData.cv_data;
    const { applicant_name, email, processed_timestamp } = extractedData.metadata;

    // Prepare row data for Google Sheets
    const row = [
      applicant_name,
      email,
      personal_info.name,
      personal_info.email,
      personal_info.phone || '',
      education.join('; '),
      qualifications.join('; '),
      projects.join('; '),
      cv_public_link,
      processed_timestamp
    ];

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Sheet1!A:J', // Adjust this based on your Google Sheet structure
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    console.log('Data saved to Google Sheets successfully!');
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
}
