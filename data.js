// Data file for mindset assessment results
// This file contains the raw submission data as a single string
// and a parser function to convert it into a usable format.
//
// UPDATES:
// - Removed hardcoded lastUpdated field (not needed for static web)
// - maxScore is now dynamically calculated from the data itself
// - Improved error handling and parsing robustness

// Raw CSV-like data provided by the user.
// To update: Simply replace the content of this template literal with new data.
const rawCSVData = `{ประทับเวลา,คะแนน,คุณค่าของความสำเร็จคืออะไร?,คนฉลาด' ในมุมมองคุณคือใคร?,ความสามารถ' เปรียบเหมือนอะไร?,บทบาทที่สำคัญที่สุดของผู้นำคืออะไร?,เส้นทางอาชีพในอุดมคติเหมือนอะไร?,ความพยายามอย่างหนักบ่งบอกอะไร?,ความล้มเหลวครั้งใหญ่เปรียบเหมือนอะไร?,คำวิจารณ์ที่ตรงไปตรงมาทำหน้าที่เหมือนอะไร?,ทีมที่แข็งแกร่งที่สุดสร้างมาจากอะไร?,เป้าหมายสูงสุดของการเรียนรู้คืออะไร?,ตัวตนที่แท้จริงของคุณเหมือนอะไร?,ความมั่นใจที่แท้จริงมาจากไหน?,ความท้าทายที่ยากมากเปรียบเหมือนอะไร?,ความผิดพลาด' มีความหมายว่าอย่างไร?,อนาคตในมุมมองของคุณเป็นอย่างไร?,ความรู้ที่มีค่าที่สุดเปรียบเหมือนอะไร?,การถกเถียงในเรื่องงานมีเป้าหมายเพื่ออะไร?,ความเป็น 'อัจฉริยะ' คืออะไร?,สมองมนุษย์ทำงานเหมือนอะไร?,ศักยภาพ' ของมนุษย์เปรียบเหมือนอะไร?
"14/7/2025, 9:14:43",13 / 20,คือ 'การยอมรับ' และสถานะเมื่อถึงปลายทาง,คือคนที่มี 'คำถามที่ดี' และรู้วิธีค้นหาคำตอบ,เหมือน 'กล้ามเนื้อ' ที่ฝึกฝนให้แข็งแกร่งขึ้นได้,คือการเป็น 'ผู้ตัดสิน' ที่แม่นยำและประเมินคนได้ถูกต้อง,เหมือน 'การปีนบันได' สู่ตำแหน่งที่สูงขึ้นชัดเจน,เป็นกระบวนการที่จำเป็นเพื่อ 'สร้างความเชี่ยวชาญ',เหมือน 'ข้อมูลการทดลอง' ที่ชี้จุดที่ต้องปรับปรุง,เหมือน 'เข็มทิศ' ที่ชี้ทิศทางการพัฒนาตนเอง,การสร้าง 'พื้นที่ปลอดภัย' ให้ทุกคนกล้าพลาดและเรียนรู้,เพื่อ 'พิสูจน์ตัวเอง' และเพิ่มคุณค่าในฐานะผู้มีความรู้,เหมือน 'รูปปั้น' ที่มีโครงสร้างชัดเจนและมั่นคง,มาจาก 'การกล้าที่จะไม่รู้' และพร้อมเรียนรู้เสมอ,เหมือน 'โปรแกรมออกกำลังกาย' ที่ทำให้เราแข็งแกร่งขึ้น,คือ 'ค่าเล่าเรียน' ของบทเรียนที่มีค่าที่สุด,เป็น 'จุดหมายปลายทาง' ที่ต้องวางแผนและไปให้ถึง,เหมือน 'กระแสน้ำ' ที่ยิ่งแบ่งปันยิ่งอุดมสมบูรณ์,เพื่อ 'ค้นหาว่าใครถูก' และเลือกทางที่ดีที่สุดทางเดียว,คือ 'ความทุ่มเท' อย่างลึกซึ้งจนตกผลึกเป็นความเชี่ยวชาญ,เหมือน 'เมือง' ที่สร้างเส้นทางใหม่ๆ เชื่อมต่อกันเสมอ,เหมือน 'เมล็ดพันธุ์' ที่รอการดูแลเพื่อเติบโต}`;

/**
 * Parses the raw CSV-like string into a structured JavaScript object.
 * @param {string} csvString The raw data string.
 * @returns {{submissions: object[], maxScore: number}}
 */
function parseMindsetCSV(csvString) {
  // Split the string into lines and filter out any empty lines
  const lines = csvString
    .trim()
    .split('\n')
    .filter((line) => line.trim() !== '');

  if (lines.length === 0) {
    return { submissions: [], maxScore: 20 };
  }

  // Extract headers from the first line, removing curly braces
  const headers = lines[0]
    .replace(/[{}]/g, '')
    .split(',')
    .map((h) => h.trim());

  // The rest of the lines are the data records
  const records = lines.slice(1);

  let detectedMaxScore = 20; // Default fallback

  // Map over the records to create an array of submission objects
  const submissions = records.map((record) => {
    // This regex handles comma-separated values, including those enclosed in quotes.
    const values =
      record
        .match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)
        ?.map((v) => v.trim().replace(/^"|"$/g, '')) || [];

    const submissionObject = {};

    headers.forEach((header, index) => {
      const key = header;
      const value = values[index] || '';

      if (key === 'คะแนน') {
        // Extract the numerical score from the "X / Y" format
        const scoreParts = value.split('/');
        if (scoreParts.length >= 2) {
          submissionObject['score'] = parseInt(scoreParts[0].trim(), 10) || 0;
          // Update detected max score if we find a valid one
          const maxFromData = parseInt(scoreParts[1].trim(), 10);
          if (!isNaN(maxFromData) && maxFromData > 0) {
            detectedMaxScore = maxFromData;
          }
        } else {
          // If no "/" format found, treat as direct score
          submissionObject['score'] = parseInt(value.trim(), 10) || 0;
        }
      } else {
        // Use the header as the key for other data
        submissionObject[key] = value;
      }
    });

    return submissionObject;
  });

  return {
    submissions: submissions,
    maxScore: detectedMaxScore,
  };
}

// Parse the raw data to be used by the application
const rawData = parseMindsetCSV(rawCSVData);

// Export for use in the main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = rawData;
}

//
