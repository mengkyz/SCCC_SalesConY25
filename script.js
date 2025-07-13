// --- DATA INITIALIZATION ---
// Raw data is now loaded from data.js file
// To update data: Edit the data.js file and replace the submissions array
//
// UPDATES:
// - Dynamic maxScore detection from data (no more hardcoding)
// - Removed lastUpdated field (not needed for static web)
// - Added error handling and validation

// Define Mindset Levels, their properties, and recommendations
const mindsetLevels = [
  {
    name: 'Strong Growth',
    range: [17, 20],
    color: '#16a34a', // Green 600
    bgColor: 'bg-green-600',
    description:
      'คุณมี Growth Mindset ที่แข็งแกร่งและนำมาใช้ในการตัดสินใจจริง มองความท้าทายเป็นโอกาสและเห็นคุณค่าของความพยายามอย่างแท้จริง',
    recommendations: [
      '<b>แบ่งปันมุมมอง:</b> ใช้ Mindset ของคุณเป็นแรงบันดาลใจและเป็นพี่เลี้ยง (Mentor) ให้กับคนรอบข้าง',
      "<b>ท้าทาย 'วิธีการเรียนรู้':</b> ลองท้าทายตัวเองไม่ใช่แค่ที่ 'ผลลัพธ์' แต่ที่ 'กระบวนการ' เช่น ลองเรียนรู้ทักษะใหม่ด้วยวิธีที่ไม่เคยทำมาก่อน",
      '<b>สร้างสภาพแวดล้อมแห่งการเติบโต:</b> เป็นผู้นำในการสร้างวัฒนธรรมองค์กรที่ปลอดภัย ที่ทุกคนกล้าลอง กล้าพลาด และเรียนรู้ไปด้วยกัน',
    ],
  },
  {
    name: 'Growth Tendency',
    range: [12, 16],
    color: '#65a30d', // Lime 600
    bgColor: 'bg-lime-600',
    description:
      'คุณมีแนวโน้มที่จะเติบโตและเชื่อในการพัฒนา แต่ในบางครั้งเมื่อเจอกับความกดดันหรือความล้มเหลวครั้งใหญ่อาจเผลอกลับไปคิดแบบ Fixed Mindset ได้',
    recommendations: [
      "<b>สร้าง 'บันทึกการเติบโต':</b> จดบันทึกความสำเร็จเล็กๆ ที่มาจากการพยายามและความท้าทาย เพื่อย้ำเตือนตัวเองเมื่อรู้สึกท้อ",
      "<b>เปลี่ยนคำพูดในใจ:</b> เมื่อได้ยินเสียงในหัวว่า 'ฉันทำไม่ได้' ให้ลองเติมคำว่า '...ในตอนนี้' เข้าไปเสมอ",
      '<b>หาความท้าทายที่พอดี:</b> เลือกทำในสิ่งที่ท้าทายแต่ไม่ยากจนเกินไป (Zone of Proximal Development) เพื่อสร้างความมั่นใจอย่างต่อเนื่อง',
    ],
  },
  {
    name: 'Mixed Mindset',
    range: [8, 11],
    color: '#2563eb', // Blue 600
    bgColor: 'bg-blue-600',
    description:
      'คุณอยู่ในช่วงเปลี่ยนผ่านที่สำคัญ เห็นคุณค่าของทั้งพรสวรรค์และความพยายาม แต่ยังมีความลังเลและไม่แน่ใจว่าสิ่งไหนสำคัญกว่ากัน',
    recommendations: [
      "<b>สังเกต 'จุดกระตุ้น' ของคุณ:</b> ลองสังเกตว่าสถานการณ์แบบไหน (เช่น คำวิจารณ์, การเปรียบเทียบ) ที่ทำให้คุณเผลอคิดแบบ Fixed Mindset",
      "<b>เรียนรู้เรื่อง 'Neuroplasticity':</b> ศึกษาเรื่องความยืดหยุ่นของสมอง จะทำให้คุณเชื่อมั่นว่าการเปลี่ยนแปลงและพัฒนาเป็นไปได้จริงในทางวิทยาศาสตร์",
      "<b>แยก 'ตัวตน' ออกจาก 'ผลงาน':</b> ฝึกมองว่าความล้มเหลวเป็นเพียงผลลัพธ์ของการกระทำ ไม่ใช่คำตัดสินคุณค่าทั้งหมดในตัวคุณ",
    ],
  },
  {
    name: 'Fixed Tendency',
    range: [5, 7],
    color: '#f97316', // Orange 500
    bgColor: 'bg-orange-500',
    description:
      'คุณค่อนข้างระมัดระวังและมักจะเลือกทางที่ปลอดภัย เพราะเชื่อว่าความสามารถเป็นสิ่งที่ค่อนข้างคงที่ การทำพลาดจึงเป็นเรื่องน่ากังวล',
    recommendations: [
      "<b>เริ่มต้นจากชัยชนะเล็กๆ:</b> ตั้งเป้าหมายที่ท้าทายเล็กน้อยและทำได้สำเร็จ เพื่อสร้างความรู้สึก 'ฉันทำได้' (Self-efficacy)",
      "<b>ชื่นชม 'กระบวนการ' ไม่ใช่แค่ 'ผลลัพธ์':</b> ลองชื่นชมตัวเองหรือคนอื่นที่ 'ความพยายาม' หรือ 'กลยุทธ์ที่ใช้' แทนที่จะชมแค่ว่า 'เก่ง' หรือ 'ฉลาด'",
      '<b>มองหา Role Model:</b> หาบุคคลต้นแบบที่ประสบความสำเร็จจากความพยายาม ไม่ใช่แค่จากพรสวรรค์ เพื่อสร้างแรงบันดาลใจ',
    ],
  },
  {
    name: 'Strong Fixed',
    range: [0, 4],
    color: '#dc2626', // Red 600
    bgColor: 'bg-red-600',
    description:
      'คุณมีความเชื่ออย่างชัดเจนว่าความสามารถและสติปัญญาเป็นสิ่งที่ไม่สามารถเปลี่ยนแปลงได้ ทำให้มักหลีกเลี่ยงความท้าทายเพื่อป้องกันความล้มเหลว',
    recommendations: [
      "<b>ทำความเข้าใจว่านี่คือ 'ความเชื่อ' ไม่ใช่ 'ความจริง':</b> ขั้นแรกคือการยอมรับว่า Fixed Mindset เป็นเพียงชุดความคิดหนึ่ง ไม่ใช่กฎของธรรมชาติ",
      "<b>เพียงแค่ 'ลอง' โดยไม่มีแรงกดดัน:</b> ลองทำกิจกรรมใหม่ๆ ที่คุณไม่เคยทำ โดยตั้งเป้าแค่ 'การได้ลอง' ไม่ใช่ 'การทำให้สำเร็จ'",
      '<b>ฟังเรื่องราวของความพยายาม:</b> อ่านหรือฟังชีวประวัติของคนที่เคยล้มเหลวแต่ไม่ยอมแพ้ จะช่วยเปิดมุมมองใหม่ๆ ได้',
    ],
  },
];

// --- SCRIPT EXECUTION ON PAGE LOAD ---
window.onload = function () {
  try {
    // Get data from the external data.js file
    if (typeof rawData === 'undefined') {
      console.error(
        'rawData is not defined. Make sure data.js is loaded properly.'
      );
      return;
    }

    const submissions = rawData.submissions || [];
    const maxScore = rawData.maxScore || 20;

    console.log(
      `Loaded ${submissions.length} submissions with maxScore: ${maxScore}`
    );

    // Register the datalabels plugin globally
    Chart.register(ChartDataLabels);

    // 1. Process Data
    const levelCounts = {};
    mindsetLevels.forEach((level) => {
      levelCounts[level.name] = 0;
    });

    submissions.forEach((sub) => {
      const score = sub.score || 0;
      for (const level of mindsetLevels) {
        if (score >= level.range[0] && score <= level.range[1]) {
          levelCounts[level.name]++;
          break;
        }
      }
    });

    // 2. Update Stats
    const totalParticipants = submissions.length;
    const totalScore = submissions.reduce(
      (sum, sub) => sum + (sub.score || 0),
      0
    );
    const averageScore =
      totalParticipants > 0 ? (totalScore / totalParticipants).toFixed(1) : 0;

    document.getElementById('totalParticipants').textContent =
      totalParticipants;
    document.getElementById('averageScore').textContent = averageScore;
    document.getElementById(
      'maxScoreDescription'
    ).textContent = `จากคะแนนเต็ม ${maxScore}`;

    // 3. Render Chart
    const ctx = document.getElementById('mindsetChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: mindsetLevels.map((level) => level.name),
        datasets: [
          {
            label: 'จำนวนผู้เข้าร่วม',
            data: mindsetLevels.map((level) => levelCounts[level.name]),
            backgroundColor: mindsetLevels.map((level) => level.color),
            borderColor: '#ffffff',
            borderWidth: 4,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // --- IMPROVED LEGEND AND TOOLTIP ---
          legend: {
            position: 'bottom',
            labels: {
              font: {
                family: "'Sarabun', sans-serif",
                size: 14,
              },
              padding: 20,
              generateLabels: function (chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  const total = data.datasets[0].data.reduce(
                    (a, b) => a + b,
                    0
                  );
                  return data.labels.map((label, i) => {
                    const meta = chart.getDatasetMeta(0);
                    const style = meta.controller.getStyle(i);
                    const value = data.datasets[0].data[i];
                    const percentage =
                      total > 0 ? ((value / total) * 100).toFixed(1) : 0;

                    return {
                      text: `${label}: ${percentage}% (${value} คน)`,
                      fillStyle: style.backgroundColor,
                      strokeStyle: style.borderColor,
                      lineWidth: style.borderWidth,
                      hidden:
                        isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                      index: i,
                    };
                  });
                }
                return [];
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.chart.data.datasets[0].data.reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage =
                  total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return `${label}: ${percentage}% (${value} คน)`;
              },
            },
          },
          // --- ADDED DATALABELS CONFIGURATION ---
          datalabels: {
            formatter: (value, ctx) => {
              const total = ctx.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage =
                total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
              // Only show label if value is not zero
              return value > 0 ? percentage : '';
            },
            color: '#fff',
            font: {
              weight: 'bold',
              size: 14,
              family: "'Sarabun', sans-serif",
            },
            textStrokeColor: '#000',
            textStrokeWidth: 2,
          },
        },
        cutout: '40%',
      },
    });

    // 4. Render Tabs and Content
    const tabContainer = document.getElementById('tab-container');
    const tabContentContainer = document.getElementById(
      'tab-content-container'
    );

    mindsetLevels.forEach((level, index) => {
      // Create Tab Button
      const button = document.createElement('button');
      button.className = `tab-button ${level.bgColor}`;
      button.textContent = level.name;
      button.dataset.target = `tab-${index}`;
      if (index === 0) button.classList.add('active');
      tabContainer.appendChild(button);

      // Create Tab Content
      const content = document.createElement('div');
      content.id = `tab-${index}`;
      content.className = 'tab-content';
      if (index === 0) content.classList.add('active');

      let recommendationsHtml = level.recommendations
        .map(
          (rec) => `
            <li class="recommendation-item">
              <div class="check-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="recommendation-text">${rec}</span>
            </li>
          `
        )
        .join('');

      content.innerHTML = `
        <div class="content-panel" style="border-color: ${level.color}; background-color: ${level.color}1A;">
          <h3 class="content-title" style="color: ${level.color};">${level.name} (${level.range[0]}-${level.range[1]} คะแนน)</h3>
          <p class="content-description">${level.description}</p>
          <h4 class="content-subtitle">ข้อเสนอแนะเพื่อการเติบโต:</h4>
          <ul class="recommendations-list">
            ${recommendationsHtml}
          </ul>
        </div>
      `;
      tabContentContainer.appendChild(content);
    });

    // 5. Add Tab Click Logic (Improved for better UX)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        // Deactivate all buttons by removing 'active' class
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        // Deactivate all content panes
        tabContents.forEach((content) => content.classList.remove('active'));

        // Activate the clicked button and its corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.target).classList.add('active');
      });
    });
  } catch (error) {
    console.error('Error initializing application:', error);
    // Show error message to user
    document.getElementById('totalParticipants').textContent = 'Error';
    document.getElementById('averageScore').textContent = 'Error';
    document.getElementById('maxScoreDescription').textContent =
      'Error loading data';

    // Show error message in chart area
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      chartContainer.innerHTML =
        '<p style="text-align: center; color: red; padding: 50px;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }

    // Show error message in tabs area
    const tabContainer = document.getElementById('tab-container');
    const tabContentContainer = document.getElementById(
      'tab-content-container'
    );
    if (tabContainer) {
      tabContainer.innerHTML =
        '<p style="text-align: center; color: red;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
    if (tabContentContainer) {
      tabContentContainer.innerHTML = '';
    }
  }
};
