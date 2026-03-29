// ── CONSTANTS ────────────────────────────────────────────────────────────────
const DATA_FILE = 'data.json';
const VERSION   = 1;

const STATUSES = [
  { v:'not_applied',      l:'— Not Applied'       },
  { v:'applied',          l:'📤 Applied'           },
  { v:'viewed',           l:'👁 Profile Viewed'    },
  { v:'phone_screen',     l:'📞 Phone Screen'      },
  { v:'home_assignment',  l:'📝 Home Assignment'   },
  { v:'interview_1',      l:'🎯 Interview Round 1' },
  { v:'interview_2',      l:'🎯 Interview Round 2' },
  { v:'interview_final',  l:'🏁 Final Interview'   },
  { v:'offer',            l:'🎉 Offer Received!'   },
  { v:'accepted',         l:'✅ Offer Accepted'    },
  { v:'rejected',         l:'❌ Rejected'          },
  { v:'ghosted',          l:'👻 Ghosted'           },
  { v:'withdrawn',        l:'↩ Withdrawn'          },
];

const IN_PROG   = ['viewed','phone_screen','home_assignment','interview_1','interview_2','interview_final'];
const APPLIED_S = ['applied','viewed','phone_screen','home_assignment','interview_1','interview_2','interview_final','offer','accepted','rejected','ghosted','withdrawn'];
const OFFERS_S  = ['offer','accepted'];
const STATUS_OPTS = STATUSES.map(s=>`<option value="${s.v}">${s.l}</option>`).join('');

// ── BASE COMPANIES (100) ─────────────────────────────────────────────────────
const BASE_COMPANIES = [
  {id:'c001',name:'NICE Systems',              domain:'Contact Center AI / CX',              city:'Raanana',     ex:'NASDAQ', careers:'https://www.nice.com/careers/find-a-job'},
  {id:'c002',name:'Amdocs',                    domain:'Telecom Software / BSS/OSS',           city:'Raanana',     ex:'NASDAQ', careers:'https://jobs.amdocs.com/careers'},
  {id:'c003',name:'Microsoft Israel R&D',      domain:'Cloud / AI / Security / Dynamics',    city:'Raanana',     ex:'NASDAQ', careers:'https://www.microsoftrnd.co.il/jobs'},
  {id:'c004',name:'Nvidia Israel',             domain:'AI / GPU / Semiconductors',            city:'Raanana',     ex:'NASDAQ', careers:'https://www.nvidia.com/en-us/about-nvidia/careers/'},
  {id:'c005',name:'HP Inc. Israel',            domain:'Hardware / Software / Print',          city:'Raanana',     ex:'NYSE',   careers:'https://jobs.hp.com/'},
  {id:'c006',name:'Glassix',                   domain:'AI Messaging / CX Platform',           city:'Raanana',     ex:'Private',careers:'https://www.glassix.com/careers'},
  {id:'c007',name:'Ciena Israel',              domain:'Networking / Optical Systems',         city:'Raanana',     ex:'NYSE',   careers:'https://www.ciena.com/about/careers/'},
  {id:'c008',name:'ECI Telecom',               domain:'Telecom Networking / SDN',             city:'Raanana',     ex:'Private',careers:'https://www.ecitele.com/careers/'},
  {id:'c009',name:'Comverse',                  domain:'Telecom Software / Billing',           city:'Raanana',     ex:'Private',careers:'https://www.comverse.com/about-us/careers/'},
  {id:'c010',name:'Comodo / Xcitium',          domain:'Cybersecurity / Zero Trust',           city:'Raanana',     ex:'Private',careers:'https://www.comodo.com/company/careers.php'},
  {id:'c011',name:'Check Point Software',      domain:'Cybersecurity / Network Security',     city:'Herzliya',    ex:'NASDAQ', careers:'https://www.checkpoint.com/careers/position-list/'},
  {id:'c012',name:'Verint Systems',            domain:'Customer Engagement / CX Analytics',   city:'Herzliya',    ex:'NASDAQ', careers:'https://www.verint.com/careers/'},
  {id:'c013',name:'SolarEdge',                 domain:'Energy Tech / Smart Inverters',        city:'Herzliya',    ex:'NASDAQ', careers:'https://corporate.solaredge.com/en/careers'},
  {id:'c014',name:'Playtika',                  domain:'Gaming / Tech Platform',               city:'Herzliya',    ex:'NASDAQ', careers:'https://www.playtika.com/careers/'},
  {id:'c015',name:'Cognyte',                   domain:'Investigative Analytics / Security',   city:'Herzliya',    ex:'NASDAQ', careers:'https://www.cognyte.com/company/careers/'},
  {id:'c016',name:'PTC Israel',                domain:'Industrial Software / IoT / AR',       city:'Herzliya',    ex:'NASDAQ', careers:'https://www.ptc.com/en/careers'},
  {id:'c017',name:'Amazon Web Services Israel',domain:'Cloud / Developer Tools / AI',         city:'Herzliya',    ex:'NASDAQ', careers:'https://www.amazon.jobs/en/search?base_query=&loc_query=Israel'},
  {id:'c018',name:'Broadcom (VMware R&D)',     domain:'Cloud Infrastructure / Virtualization',city:'Herzliya',    ex:'NASDAQ', careers:'https://careers.broadcom.com/'},
  {id:'c019',name:'Mend.io',                   domain:'AppSec / DevSecOps / SCA',             city:'Herzliya',    ex:'Private',careers:'https://www.mend.io/careers/'},
  {id:'c020',name:'AppsFlyer',                 domain:'Marketing Analytics / Mobile MMP',     city:'Herzliya',    ex:'Private',careers:'https://www.appsflyer.com/careers/'},
  {id:'c021',name:'Shift4',                    domain:'Payments / FinTech / POS',             city:'Herzliya',    ex:'NYSE',   careers:'https://job-boards.greenhouse.io/shift4'},
  {id:'c022',name:'Unity (ironSource)',         domain:'AdTech / Gaming / Monetization',       city:'Herzliya',    ex:'NYSE',   careers:'https://unity.com/en/careers'},
  {id:'c023',name:'Radware',                   domain:'Cybersecurity / DDoS / ADC',           city:'Herzliya',    ex:'NASDAQ', careers:'https://www.radware.com/careers/'},
  {id:'c024',name:'General Motors Israel',     domain:'Autonomous Vehicles / SDV / Embedded', city:'Herzliya',    ex:'NYSE',   careers:'https://generalmotors.wd5.myworkdayjobs.com/Careers_GM'},
  {id:'c025',name:'Dell Technologies Israel',  domain:'Cloud / Storage / Enterprise IT',      city:'Herzliya',    ex:'NYSE',   careers:'https://dell.wd1.myworkdayjobs.com/External'},
  {id:'c026',name:'Vonage (Ericsson)',          domain:'CPaaS / Communications APIs',          city:'Herzliya',    ex:'NASDAQ', careers:'https://www.vonage.com/careers/'},
  {id:'c027',name:'CEVA',                      domain:'Semiconductors / AI DSP Chips',        city:'Herzliya',    ex:'NASDAQ', careers:'https://www.ceva-dsp.com/company/careers/'},
  {id:'c028',name:'SAP Israel',                domain:'Enterprise Software / ERP / HCM',      city:'Herzliya',    ex:'NYSE',   careers:'https://jobs.sap.com/'},
  {id:'c029',name:'LiveU',                     domain:'Video Streaming / Broadcast Tech',     city:'Herzliya',    ex:'Private',careers:'https://www.liveu.tv/about-liveu/careers'},
  {id:'c030',name:'SimilarWeb',                domain:'Digital Intelligence / Web Analytics', city:'Herzliya',    ex:'NYSE',   careers:'https://www.similarweb.com/corp/careers/'},
  {id:'c031',name:'CyberArk',                  domain:'Identity Security / PAM / Zero Trust', city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.cyberark.com/careers/all-job-openings/'},
  {id:'c032',name:'Payoneer',                  domain:'FinTech / Cross-Border Payments',      city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.payoneer.com/about/careers/'},
  {id:'c033',name:'Sapiens International',     domain:'Insurance & Financial Software',       city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.sapiens.com/company/careers/'},
  {id:'c034',name:'Radcom',                    domain:'Network Analytics / 5G Monitoring',    city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.radcom.com/careers/'},
  {id:'c035',name:'Ceragon Networks',          domain:'Wireless Backhaul / Microwave Radio',  city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.ceragon.com/careers'},
  {id:'c036',name:'Nokia Israel R&D',          domain:'5G / Cloud Core / Telecom SW',         city:'Petach Tikva',ex:'NYSE',   careers:'https://www.nokia.com/careers/'},
  {id:'c037',name:'Ericsson Israel',           domain:'Telecom / 5G / BSS/OSS',              city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.ericsson.com/en/careers'},
  {id:'c038',name:'Pentera',                   domain:'Automated Pentesting / Security',      city:'Petach Tikva',ex:'Private',careers:'https://pentera.io/company/careers/'},
  {id:'c039',name:'WalkMe (SAP)',              domain:'Digital Adoption Platform / SaaS',     city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.walkme.com/careers/'},
  {id:'c040',name:'Varonis',                   domain:'Data Security / DLP / DSPM',           city:'Petach Tikva',ex:'NASDAQ', careers:'https://info.varonis.com/careers'},
  {id:'c041',name:'LivePerson Israel',         domain:'Conversational AI / CX / Messaging',   city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.liveperson.com/company/careers/'},
  {id:'c042',name:'Lusha',                     domain:'B2B Data Intelligence / Sales Tech',   city:'Petach Tikva',ex:'Private',careers:'https://www.lusha.com/careers/'},
  {id:'c043',name:'Atera',                     domain:'RMM / IT Management SaaS / MSP',       city:'Petach Tikva',ex:'Private',careers:'https://www.atera.com/careers/'},
  {id:'c044',name:'Synamedia',                 domain:'Video Streaming / OTT Security',       city:'Petach Tikva',ex:'Private',careers:'https://www.synamedia.com/careers/'},
  {id:'c045',name:'Attunity (Qlik)',           domain:'Data Integration / CDC / ETL',         city:'Petach Tikva',ex:'NASDAQ', careers:'https://www.qlik.com/us/company/careers'},
  {id:'c046',name:'Ness Technologies',         domain:'IT Services / Software Dev / Cloud',   city:'Petach Tikva',ex:'Private',careers:'https://www.nesstechnologies.com/careers/'},
  {id:'c047',name:'Tipalti',                   domain:'AP Automation / FinTech / SaaS',       city:'Petach Tikva',ex:'Private',careers:'https://tipalti.com/careers/'},
  {id:'c048',name:'Sisense',                   domain:'Analytics / BI / Embedded Analytics',  city:'Petach Tikva',ex:'Private',careers:'https://www.sisense.com/company/careers/'},
  {id:'c049',name:'Sito (IDIT Technologies)',  domain:'Insurance Tech / Policy SaaS',         city:'Petach Tikva',ex:'Private',careers:'https://www.idit.com/'},
  {id:'c050',name:'Incredibuild',              domain:'Build Acceleration / DevTools / CI',   city:'Petach Tikva',ex:'Private',careers:'https://www.incredibuild.com/careers'},
  {id:'c051',name:'Allot Communications',      domain:'Network Intelligence / DPI / Security',city:'Hod HaSharon',ex:'NASDAQ', careers:'https://www.allot.com/company/careers/'},
  {id:'c052',name:'Elbit Systems (SW div.)',   domain:'Defense Electronics / C4I / SW',       city:'Hod HaSharon',ex:'NASDAQ', careers:'https://www.elbitsystems.com/careers/'},
  {id:'c053',name:'ECI Telecom (HH)',          domain:'Telecom Networking / Optical',         city:'Hod HaSharon',ex:'Private',careers:'https://www.ecitele.com/careers/'},
  {id:'c054',name:'Foxbox Digital',            domain:'Digital Products / Software Dev',      city:'Hod HaSharon',ex:'Private',careers:'https://foxbox.io/careers'},
  {id:'c055',name:'Neverware / CloudReady',    domain:'Cloud / OS / Enterprise IT',           city:'Hod HaSharon',ex:'NASDAQ', careers:'https://cloudready.neverware.com/careers'},
  {id:'c056',name:'Surecomp',                  domain:'Trade Finance / FinTech / SaaS',       city:'Kfar Saba',   ex:'Private',careers:'https://www.surecomp.com/careers/'},
  {id:'c057',name:'Silicom',                   domain:'Networking Hardware / Smart NICs',     city:'Kfar Saba',   ex:'NASDAQ', careers:'https://www.silicom-usa.com/careers/'},
  {id:'c058',name:'ECI Telecom (KS)',          domain:'Telecom / IP+Optical Networking',      city:'Kfar Saba',   ex:'Private',careers:'https://www.ecitele.com/careers/'},
  {id:'c059',name:'Bynet Data Communications',domain:'IT Infrastructure / Systems Integr.',   city:'Kfar Saba',   ex:'Private',careers:'https://www.bynet.co.il/en/careers'},
  {id:'c060',name:'Cyren (Cradlepoint)',       domain:'Cybersecurity / Email & Web Filter',   city:'Kfar Saba',   ex:'NASDAQ', careers:'https://www.cradlepoint.com/careers/'},
  {id:'c061',name:'Google Israel',            domain:'Cloud / AI / Search / Maps / Android', city:'Multiple',    ex:'NASDAQ', careers:'https://careers.google.com/locations/tel-aviv/'},
  {id:'c062',name:'Meta (Facebook) Israel',   domain:'AI / Social / AR+VR / WhatsApp Infra', city:'Multiple',    ex:'NASDAQ', careers:'https://www.metacareers.com/'},
  {id:'c063',name:'Apple Israel',             domain:'Semiconductors / AI / SW Engineering', city:'Multiple',    ex:'NASDAQ', careers:'https://jobs.apple.com/'},
  {id:'c064',name:'Intel Israel',             domain:'Semiconductors / AI / Autonomous',     city:'Multiple',    ex:'NASDAQ', careers:'https://jobs.intel.com/en/search#q=israel'},
  {id:'c065',name:'IBM Israel',               domain:'Cloud / AI / Enterprise / Consulting', city:'Multiple',    ex:'NYSE',   careers:'https://www.ibm.com/employment/'},
  {id:'c066',name:'Cisco Israel',             domain:'Networking / Security / Collab / SD-WAN',city:'Multiple',  ex:'NASDAQ', careers:'https://jobs.cisco.com/'},
  {id:'c067',name:'Qualcomm Israel',          domain:'Semiconductors / 5G / AI / Wi-Fi',     city:'Multiple',    ex:'NASDAQ', careers:'https://www.qualcomm.com/company/careers'},
  {id:'c068',name:'Mobileye',                 domain:'Autonomous Driving / Computer Vision', city:'Multiple',    ex:'NASDAQ', careers:'https://jobs.mobileye.com/'},
  {id:'c069',name:'Monday.com',               domain:'Work OS / SaaS / No-Code Platform',    city:'Multiple',    ex:'NASDAQ', careers:'https://monday.com/careers/'},
  {id:'c070',name:'Wix',                      domain:'Web Platform / SaaS / CMS',            city:'Multiple',    ex:'NASDAQ', careers:'https://www.wix.com/jobs/'},
  {id:'c071',name:'Fiverr',                   domain:'Freelance Marketplace / Platform',     city:'Multiple',    ex:'NYSE',   careers:'https://www.fiverr.com/careers'},
  {id:'c072',name:'eToro',                    domain:'FinTech / Social Trading / Crypto',    city:'Multiple',    ex:'NASDAQ', careers:'https://www.etoro.com/careers/'},
  {id:'c073',name:'CrowdStrike Israel',       domain:'Cybersecurity / EDR / Cloud Security', city:'Multiple',    ex:'NASDAQ', careers:'https://www.crowdstrike.com/careers/'},
  {id:'c074',name:'Palo Alto Networks Israel',domain:'Cybersecurity / SASE / XDR / CNAPP',   city:'Multiple',    ex:'NASDAQ', careers:'https://www.paloaltonetworks.com/company/careers'},
  {id:'c075',name:'Fortinet Israel',          domain:'Network Security / Firewall / SD-WAN', city:'Multiple',    ex:'NASDAQ', careers:'https://www.fortinet.com/corporate/careers'},
  {id:'c076',name:'SentinelOne Israel',       domain:'Cybersecurity / AI EDR / XDR',         city:'Multiple',    ex:'NYSE',   careers:'https://www.sentinelone.com/jobs/'},
  {id:'c077',name:'Zscaler Israel',           domain:'Cloud Security / Zero Trust / SASE',   city:'Multiple',    ex:'NASDAQ', careers:'https://www.zscaler.com/careers'},
  {id:'c078',name:'Okta Israel',              domain:'Identity / SSO / Access Management',   city:'Multiple',    ex:'NASDAQ', careers:'https://www.okta.com/company/careers/'},
  {id:'c079',name:'Cloudflare Israel',        domain:'CDN / DDoS Protection / Edge Compute', city:'Multiple',    ex:'NYSE',   careers:'https://www.cloudflare.com/careers/'},
  {id:'c080',name:'Datadog Israel',           domain:'Monitoring / Observability / APM',     city:'Multiple',    ex:'NASDAQ', careers:'https://www.datadoghq.com/careers/'},
  {id:'c081',name:'JFrog',                    domain:'DevOps / Artifact Management / MLOps', city:'Multiple',    ex:'NASDAQ', careers:'https://jfrog.com/careers/'},
  {id:'c082',name:'Snyk',                     domain:'Developer Security / AppSec / SAST',   city:'Multiple',    ex:'Private',careers:'https://snyk.io/careers/'},
  {id:'c083',name:'Aqua Security',            domain:'Cloud Native Security / K8S / CSPM',   city:'Multiple',    ex:'Private',careers:'https://www.aquasec.com/careers/'},
  {id:'c084',name:'Rapid7 Israel',            domain:'Cybersecurity / Vulnerability Mgmt',   city:'Multiple',    ex:'NASDAQ', careers:'https://www.rapid7.com/careers/'},
  {id:'c085',name:'Tenable Israel',           domain:'Cybersecurity / Exposure Management',  city:'Multiple',    ex:'NASDAQ', careers:'https://www.tenable.com/careers'},
  {id:'c086',name:'Coralogix',                domain:'Observability / Log Analytics / SaaS', city:'Multiple',    ex:'Private',careers:'https://coralogix.com/careers/'},
  {id:'c087',name:'BigPanda',                 domain:'AIOps / IT Operations / Alert Mgmt',   city:'Multiple',    ex:'Private',careers:'https://www.bigpanda.io/company/careers/'},
  {id:'c088',name:'Gong.io',                  domain:'Revenue Intelligence / AI Sales',      city:'Multiple',    ex:'Private',careers:'https://www.gong.io/careers/'},
  {id:'c089',name:'Outbrain',                 domain:'Content Discovery / AdTech / CTV',     city:'Multiple',    ex:'NASDAQ', careers:'https://www.outbrain.com/careers/'},
  {id:'c090',name:'Perion Network',           domain:'AdTech / Digital Advertising / CTV',   city:'Multiple',    ex:'NASDAQ', careers:'https://www.perion.com/careers/'},
  {id:'c091',name:'Via Transportation',       domain:'Transit SaaS / Mobility / MaaS',       city:'Multiple',    ex:'NYSE',   careers:'https://ridewithvia.com/about/careers'},
  {id:'c092',name:'Riskified',                domain:'eCommerce Fraud Prevention / ML',      city:'Multiple',    ex:'NYSE',   careers:'https://www.riskified.com/careers/'},
  {id:'c093',name:'Cato Networks',            domain:'SASE / Cloud Networking / Security',   city:'Multiple',    ex:'Private',careers:'https://www.catonetworks.com/careers/'},
  {id:'c094',name:'Twilio Israel (Segment)',  domain:'CPaaS / Data / Communications API',    city:'Multiple',    ex:'NYSE',   careers:'https://www.twilio.com/en-us/company/jobs'},
  {id:'c095',name:'Totango',                  domain:'Customer Success SaaS / PLG',          city:'Multiple',    ex:'Private',careers:'https://www.totango.com/careers/'},
  {id:'c096',name:'Kaltura',                  domain:'Video Platform / EdTech / SaaS',       city:'Multiple',    ex:'NASDAQ', careers:'https://corp.kaltura.com/company/careers/'},
  {id:'c097',name:'BigPanda (2)',              domain:'AIOps / ITSM / NOC Automation',        city:'Multiple',    ex:'Private',careers:'https://www.bigpanda.io/company/careers/'},
  {id:'c098',name:'Tipalti (HQ)',              domain:'Finance Automation / AP / Payroll',    city:'Multiple',    ex:'Private',careers:'https://tipalti.com/careers/'},
  {id:'c099',name:'Incredibuild (Cloud)',      domain:'Build Acceleration / DevOps / CI',     city:'Multiple',    ex:'Private',careers:'https://www.incredibuild.com/careers'},
  {id:'c100',name:'Cato Networks (HQ)',        domain:'SASE / ZTNA / Cloud Firewall',         city:'Multiple',    ex:'Private',careers:'https://www.catonetworks.com/careers/'},
];

// ── APP STATE ────────────────────────────────────────────────────────────────
let companies   = [...BASE_COMPANIES];
let jobsData    = {};
let customCos   = [];
let expanded    = new Set();
let showAddForm = new Set();
let reviewed    = new Set();
let fCity='all', fEx='all', fStatus='all', fQ='';

// ── LOAD DATA ────────────────────────────────────────────────────────────────
// ── STORAGE KEY ──────────────────────────────────────────────────────────────
const LS_KEY = 'idan_job_tracker_v1';

// ── LOAD DATA ────────────────────────────────────────────────────────────────
// Strategy:
//   1. Try to fetch data.json (works when served via Live Server / python server)
//   2. If that fails, fall back to localStorage (works when opened as file://)
//   3. localStorage is always kept in sync on every save
async function loadData() {
  let loaded = false;

  // 1. Try data.json
  try {
    const res = await fetch('data.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      // Only use data.json if it has actual job data
      if (data.jobs && Object.keys(data.jobs).length > 0) {
        jobsData  = data.jobs            || {};
        customCos = data.customCompanies || [];
        customCos.forEach(c => { if (!companies.find(x=>x.id===c.id)) companies.push(c); });
        // Sync to localStorage so it works offline too
        localStorage.setItem(LS_KEY, JSON.stringify(data));
        showToast('Data loaded from data.json');
        loaded = true;
      }
    }
  } catch(e) {
    // fetch not available (file:// protocol) — that is fine, fall through
  }

  // 2. Fall back to localStorage
  if (!loaded) {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.jobs && Object.keys(data.jobs).length > 0) {
          jobsData  = data.jobs            || {};
          customCos = data.customCompanies || [];
          reviewed  = new Set(data.reviewed || []);
          customCos.forEach(c => { if (!companies.find(x=>x.id===c.id)) companies.push(c); });
          showToast('Data loaded from browser storage');
          loaded = true;
        }
      }
    } catch(e) {}
  }

  if (!loaded) {
    showToast('No data found — add jobs and click Save!');
  }

  render();
}

// ── SAVE DATA ────────────────────────────────────────────────────────────────
// Saves to localStorage. Export JSON button downloads data.json for backup/portability.
function saveData() {
  const payload = { version:VERSION, lastSaved:new Date().toISOString(), jobs:jobsData, customCompanies:customCos, reviewed:[...reviewed] };
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    const ind = document.getElementById('save-ind');
    ind.textContent = 'Saved at ' + new Date().toLocaleTimeString();
    ind.className   = 'save-indicator ok';
    showToast('Saved to browser storage!');
  } catch(e) {
    showToast('Save failed — storage might be full', 'error');
  }
}

// ── EXPORT JSON BACKUP ────────────────────────────────────────────────────────
function exportJson() {
  const payload = { version:VERSION, lastSaved:new Date().toISOString(), jobs:jobsData, customCompanies:customCos, reviewed:[...reviewed] };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = DATA_FILE;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('Backup exported as data.json');
}

// ── IMPORT JSON BACKUP ────────────────────────────────────────────────────────
function importJson() {
  const input  = document.createElement('input');
  input.type   = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file   = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        jobsData  = data.jobs            || {};
        customCos = data.customCompanies || [];
        reviewed  = new Set(data.reviewed || []);
        companies = [...BASE_COMPANIES];
        customCos.forEach(c => { if (!companies.find(x=>x.id===c.id)) companies.push(c); });
        expanded    = new Set();
        showAddForm = new Set();
        localStorage.setItem(LS_KEY, JSON.stringify(data));
        render();
        showToast('Imported from ' + file.name);
      } catch(err) {
        showToast('Invalid JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}
// ── RENDER ───────────────────────────────────────────────────────────────────
function render() { renderTable(); updateStats(); }

function renderTable() {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  let visibleCount = 0;

  companies.forEach((co) => {
    const jobs     = jobsData[co.id] || [];
    const jCount   = jobs.length;
    const isExp    = expanded.has(co.id);
    const showForm = showAddForm.has(co.id);
    const hasApply = jobs.some(j => APPLIED_S.includes(j.status));

    // filter
    const passCity   = fCity==='all' || co.city===fCity;
    const passEx     = fEx==='all'   || co.ex===fEx;
    const passQ      = !fQ || (co.name+' '+co.domain+' '+co.city).toLowerCase().includes(fQ.toLowerCase());
    const passStatus = fStatus==='all' ||
      (fStatus==='has_jobs' && jCount>0) ||
      (fStatus==='no_jobs'  && jCount===0) ||
      (fStatus==='applied'  && hasApply) ||
      (fStatus==='in_progress' && jobs.some(j=>IN_PROG.includes(j.status)));

    if (!passCity || !passEx || !passQ || !passStatus) return;
    visibleCount++;

    const exCls  = 'ex-' + co.ex;
    const zeroClass = jCount === 0 ? 'zero' : '';

    // ── Company row ────────────────────────────────────────────────────────
    const coRow = document.createElement('tr');
    coRow.className = 'co-row' + (isExp ? ' expanded' : '') + (reviewed.has(co.id) ? ' co-reviewed' : '');
    coRow.id = 'co-' + co.id;
    coRow.onclick = () => toggleExpand(co.id);
    coRow.innerHTML = `
      <td style="width:30px">
        <span class="chevron">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2l4 3-4 3"/></svg>
        </span>
      </td>
      <td>
        <div class="co-name">
          ${esc(co.name)}
          <span class="ex-pill ${exCls}">${co.ex}</span>
        </div>
        <div class="co-domain">${esc(co.domain)}</div>
      </td>
      <td><span class="city-tag">${esc(co.city)}</span></td>
      <td onclick="event.stopPropagation()">
        <a class="careers-link" href="${esc(co.careers)}" target="_blank" rel="noopener">
          Open Careers
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
        </a>
      </td>
      <td>
        <span class="job-count ${zeroClass}">${jCount}</span>
      </td>
      <td onclick="event.stopPropagation()">
        <button class="btn-add-job" onclick="toggleAddForm('${co.id}')">
          ＋ Add Job
        </button>
      </td>
      <td onclick="event.stopPropagation()">
        <button class="btn btn-sm btn-danger-ghost" onclick="deleteCompany('${co.id}')">✕</button>
      </td>
      <td style="text-align:center" onclick="event.stopPropagation()">
        <input type="checkbox" class="reviewed-check" title="Mark as reviewed — I've finished browsing all open jobs"
          ${reviewed.has(co.id)?'checked':''}
          onchange="toggleReviewed('${co.id}',this)">
      </td>`;
    tbody.appendChild(coRow);

    // ── Jobs panel row ─────────────────────────────────────────────────────
    const panelRow = document.createElement('tr');
    panelRow.className = 'jobs-panel-row' + (isExp ? ' open' : '');
    panelRow.id = 'panel-' + co.id;
    panelRow.innerHTML = `<td class="jobs-panel-cell" colspan="8"></td>`;
    tbody.appendChild(panelRow);

    if (isExp) {
      buildJobsPanel(co, jobs, showForm, panelRow.querySelector('td'));
    }
  });

  document.getElementById('sc-visible').textContent = visibleCount;
}

// ── JOBS PANEL ───────────────────────────────────────────────────────────────
function buildJobsPanel(co, jobs, showForm, cell) {
  const panel = document.createElement('div');
  panel.className = 'jobs-panel';

  // header
  const hdr = document.createElement('div');
  hdr.className = 'jobs-panel-header';
  hdr.innerHTML = `
    <span class="jobs-panel-title">📋 Jobs at ${esc(co.name)}</span>
    <div style="display:flex;gap:8px;align-items:center">
      <a class="careers-link" href="${esc(co.careers)}" target="_blank" rel="noopener">
        Open Careers Page
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
      </a>
      <button class="btn-add-job" onclick="toggleAddForm('${co.id}')">＋ Add Job</button>
    </div>`;
  panel.appendChild(hdr);

  // Add form (standalone div, outside the table)
  if (showForm) {
    const formDiv = document.createElement('div');
    formDiv.className = 'add-job-form-panel';
    formDiv.innerHTML = `
      <div class="add-job-form" id="form-${co.id}">
        <div class="fgroup">
          <label>Role / Title *</label>
          <input class="form-input md" id="fn-role-${co.id}" type="text" placeholder="e.g. Senior .NET Developer">
        </div>
        <div class="fgroup">
          <label>Fit % (0-100)</label>
          <input class="form-input sm" id="fn-fit-${co.id}" type="number" min="0" max="100" placeholder="e.g. 75">
        </div>
        <div class="fgroup">
          <label>Job URL</label>
          <input class="form-input url" id="fn-url-${co.id}" type="text" placeholder="https://...">
        </div>
        <div class="fgroup">
          <label>Notes</label>
          <input class="form-input md" id="fn-notes-${co.id}" type="text" placeholder="optional notes">
        </div>
        <div class="fgroup" style="flex-direction:row;gap:6px;align-items:flex-end">
          <button class="btn btn-primary btn-sm" onclick="addJob('${co.id}')">Add</button>
          <button class="btn btn-ghost btn-sm" onclick="toggleAddForm('${co.id}')">Cancel</button>
        </div>
      </div>`;
    panel.appendChild(formDiv);
  }

  // jobs table
  const tableWrap = document.createElement('div');
  tableWrap.style.overflowX = 'auto';

  if (jobs.length === 0) {
    if (!showForm) {
      tableWrap.innerHTML = `<div class="empty-jobs">No jobs added yet — click "＋ Add Job" to track a position</div>`;
    }
  } else {
    const tbl = document.createElement('table');
    tbl.className = 'jobs-table';
    tbl.innerHTML = `
      <thead>
        <tr>
          <th>✓</th>
          <th>Role / Title</th>
          <th>Fit %</th>
          <th>Date Applied</th>
          <th>Status</th>
          <th>Job URL</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>`;
    const tb = document.createElement('tbody');
    tb.id = 'jobs-' + co.id;

    jobs.forEach(job => {
      tb.appendChild(buildJobRow(co.id, job));
    });

    tbl.appendChild(tb);
    tableWrap.appendChild(tbl);
  }

  panel.appendChild(tableWrap);
  cell.appendChild(panel);
}

function buildJobRow(coId, job) {
  const row = document.createElement('tr');
  row.id = 'job-' + job.id;
  if (APPLIED_S.includes(job.status)) row.classList.add('job-applied-row');

  const fit    = parseInt(job.fit) || 0;
  const fitCls = fit >= 70 ? 'fit-high' : fit >= 50 ? 'fit-med' : fit > 0 ? 'fit-low' : 'fit-none';
  const fitTxt = fit > 0 ? fit + '%' : '—';
  const hasUrl = job.url && job.url.trim() !== '';
  const jdCls  = job.jdesc ? ' has-jd' : '';

  const selOpts = STATUSES.map(s =>
    `<option value="${s.v}" ${s.v===job.status?'selected':''}>${s.l}</option>`
  ).join('');

  row.innerHTML = `
    <td style="text-align:center">
      <input type="checkbox" class="applied-check" ${APPLIED_S.includes(job.status)?'checked':''}
        onchange="onJobCheck('${coId}','${job.id}',this)">
    </td>
    <td style="min-width:160px">
      <input class="inline-input" type="text" value="${esc(job.role)}"
        placeholder="Role title"
        onchange="updateJob('${coId}','${job.id}','role',this.value)">
    </td>
    <td>
      <div class="fit-wrap ${fitCls}">
        <span class="fit-num">${fitTxt}</span>
        ${fit>0?`<div class="fit-bar-bg"><div class="fit-bar-fill" style="width:${fit}%"></div></div>`:''}
      </div>
    </td>
    <td>
      <input type="date" class="date-input" value="${job.date||''}"
        ${!APPLIED_S.includes(job.status)?'disabled':''}
        onchange="updateJob('${coId}','${job.id}','date',this.value)">
    </td>
    <td>
      <select class="status-select" data-s="${job.status}"
        onchange="onJobStatus('${coId}','${job.id}',this)">
        ${selOpts}
      </select>
    </td>
    <td style="min-width:200px">
      <div style="display:flex;align-items:center;gap:5px">
        <input class="inline-input url-field ${hasUrl?'has-val':''}" type="text"
          value="${esc(job.url||'')}" placeholder="paste job URL…"
          onchange="onJobUrl('${coId}','${job.id}',this)">
        <a class="open-url-btn ${hasUrl?'active':''}"
          href="${hasUrl?esc(job.url):'#'}" target="_blank" rel="noopener"
          id="ob-${job.id}">
          Open
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
        </a>
      </div>
    </td>
    <td style="min-width:130px">
      <input class="inline-input" type="text" value="${esc(job.notes||'')}"
        placeholder="notes…"
        onchange="updateJob('${coId}','${job.id}','notes',this.value)">
    </td>
    <td>
      <div style="display:flex;gap:4px;align-items:center">
        <button class="btn-jd${jdCls}" title="Job description &amp; interview guide" onclick="openJdModal('${coId}','${job.id}')">${job.jdesc ? '📝 JD ✓' : '📝'}</button>
        <button class="btn btn-sm btn-danger-ghost" onclick="deleteJob('${coId}','${job.id}')">✕</button>
      </div>
    </td>`;

  return row;
}

// ── TOGGLE REVIEWED ─────────────────────────────────────────────────────────
function toggleReviewed(coId, el) {
  if (el.checked) {
    reviewed.add(coId);
  } else {
    reviewed.delete(coId);
  }
  const coRow = document.getElementById('co-' + coId);
  if (coRow) coRow.classList.toggle('co-reviewed', reviewed.has(coId));
  saveData();
}

// ── TOGGLE REVIEWED ───────────────────────────────────────────────────────────
function toggleReviewed(coId, el) {
  if (el.checked) {
    reviewed.add(coId);
  } else {
    reviewed.delete(coId);
  }
  const coRow = document.getElementById('co-' + coId);
  if (coRow) coRow.classList.toggle('co-reviewed', reviewed.has(coId));
  saveData();
}

// ── TOGGLE EXPAND ─────────────────────────────────────────────────────────────
function toggleExpand(coId) {
  if (expanded.has(coId)) {
    expanded.delete(coId);
    showAddForm.delete(coId);
  } else {
    expanded.add(coId);
  }
  const coRow    = document.getElementById('co-' + coId);
  const panelRow = document.getElementById('panel-' + coId);
  if (!coRow || !panelRow) return;

  coRow.classList.toggle('expanded', expanded.has(coId));
  panelRow.classList.toggle('open', expanded.has(coId));

  if (expanded.has(coId)) {
    const co   = companies.find(c => c.id === coId);
    const jobs = jobsData[coId] || [];
    const cell = panelRow.querySelector('td');
    cell.innerHTML = '';
    buildJobsPanel(co, jobs, showAddForm.has(coId), cell);
  }
}

// ── TOGGLE ADD FORM ───────────────────────────────────────────────────────────
function toggleAddForm(coId) {
  if (!expanded.has(coId)) {
    expanded.add(coId);
  }
  if (showAddForm.has(coId)) {
    showAddForm.delete(coId);
  } else {
    showAddForm.add(coId);
  }
  // rebuild panel
  const panelRow = document.getElementById('panel-' + coId);
  const coRow    = document.getElementById('co-' + coId);
  if (panelRow) {
    panelRow.classList.add('open');
    coRow && coRow.classList.add('expanded');
    const co   = companies.find(c => c.id === coId);
    const jobs = jobsData[coId] || [];
    const cell = panelRow.querySelector('td');
    cell.innerHTML = '';
    buildJobsPanel(co, jobs, showAddForm.has(coId), cell);
  }
}

// ── ADD JOB ──────────────────────────────────────────────────────────────────
function addJob(coId) {
  const role  = document.getElementById('fn-role-'+coId)?.value.trim();
  if (!role) { showToast('Please enter a role title', 'error'); return; }
  const fit   = document.getElementById('fn-fit-'+coId)?.value.trim();
  const url   = document.getElementById('fn-url-'+coId)?.value.trim();
  const notes = document.getElementById('fn-notes-'+coId)?.value.trim();

  if (!jobsData[coId]) jobsData[coId] = [];
  const job = {
    id:    'j_' + Date.now(),
    role,
    fit:   fit || '',
    url:   url || '',
    date:  '',
    status:'not_applied',
    notes: notes || '',
  };
  jobsData[coId].push(job);
  showAddForm.delete(coId);

  // re-render panel
  const panelRow = document.getElementById('panel-' + coId);
  if (panelRow) {
    const co   = companies.find(c => c.id === coId);
    const cell = panelRow.querySelector('td');
    cell.innerHTML = '';
    buildJobsPanel(co, jobsData[coId], false, cell);
  }
  // update job count badge
  const countEl = document.querySelector(`#co-${coId} .job-count`);
  if (countEl) {
    countEl.textContent = jobsData[coId].length;
    countEl.classList.remove('zero');
  }

  updateStats();
  showToast('Job added!');
}

// ── JOB INTERACTIONS ─────────────────────────────────────────────────────────
function updateJob(coId, jobId, field, val) {
  const job = (jobsData[coId]||[]).find(j=>j.id===jobId);
  if (!job) return;
  job[field] = val;
  updateStats();
}

function onJobCheck(coId, jobId, el) {
  const job = (jobsData[coId]||[]).find(j=>j.id===jobId);
  if (!job) return;
  if (el.checked) {
    if (!job.date) job.date = new Date().toISOString().split('T')[0];
    if (job.status === 'not_applied') job.status = 'applied';
  } else {
    job.status = 'not_applied';
  }
  // update date input and status select in same row
  const row = document.getElementById('job-' + jobId);
  if (row) {
    const di = row.querySelector('.date-input');
    const ss = row.querySelector('.status-select');
    if (di) { di.value = job.date; di.disabled = !el.checked; }
    if (ss) { ss.value = job.status; ss.dataset.s = job.status; }
    row.classList.toggle('job-applied-row', el.checked);
  }
  updateStats();
}

function onJobStatus(coId, jobId, sel) {
  const job = (jobsData[coId]||[]).find(j=>j.id===jobId);
  if (!job) return;
  job.status = sel.value;
  sel.dataset.s = sel.value;
  const row = document.getElementById('job-' + jobId);
  if (row) {
    row.classList.toggle('job-applied-row', APPLIED_S.includes(sel.value));
    const di = row.querySelector('.date-input');
    if (di) di.disabled = !APPLIED_S.includes(sel.value);
  }
  updateStats();
}

function onJobUrl(coId, jobId, el) {
  const val = el.value.trim();
  const job = (jobsData[coId]||[]).find(j=>j.id===jobId);
  if (job) job.url = val;
  el.classList.toggle('has-val', val !== '');
  const ob = document.getElementById('ob-' + jobId);
  if (ob) { ob.href = val || '#'; ob.classList.toggle('active', val !== ''); }
}

function deleteJob(coId, jobId) {
  if (!confirm('Remove this job?')) return;
  if (jobsData[coId]) jobsData[coId] = jobsData[coId].filter(j=>j.id!==jobId);
  const row = document.getElementById('job-' + jobId);
  if (row) row.remove();
  const countEl = document.querySelector(`#co-${coId} .job-count`);
  if (countEl) {
    const n = (jobsData[coId]||[]).length;
    countEl.textContent = n;
    if (n === 0) countEl.classList.add('zero');
  }
  updateStats();
  showToast('Job removed');
}

// ── DELETE COMPANY ────────────────────────────────────────────────────────────
function deleteCompany(coId) {
  if (!confirm('Remove this company from your tracker?')) return;
  companies   = companies.filter(c => c.id !== coId);
  customCos   = customCos.filter(c => c.id !== coId);
  delete jobsData[coId];
  const coRow    = document.getElementById('co-' + coId);
  const panelRow = document.getElementById('panel-' + coId);
  coRow?.remove();
  panelRow?.remove();
  updateStats();
  showToast('Company removed');
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function updateStats() {
  const allJobs = Object.values(jobsData).flat();
  const apl     = allJobs.filter(j=>APPLIED_S.includes(j.status)).length;
  const prg     = allJobs.filter(j=>IN_PROG.includes(j.status)).length;
  const off     = allJobs.filter(j=>OFFERS_S.includes(j.status)).length;
  const rate    = apl>0 ? Math.round((prg+off)/apl*100) : 0;
  document.getElementById('sc-applied').textContent  = apl;
  document.getElementById('sc-jobs').textContent     = allJobs.length;
  document.getElementById('sc-progress').textContent = prg;
  document.getElementById('sc-offers').textContent   = off;
  document.getElementById('sc-rate').textContent     = rate + '%';
}

// ── FILTERS ───────────────────────────────────────────────────────────────────
function setCity(v,b) { fCity=v; setActive(b,['All','Raanana','Herzliya','Petach Tikva','Hod HaSharon','Kfar Saba','Multiple']); renderTable(); }
function setEx(v,b)   { fEx=v;   setActive(b,['All','NASDAQ','NYSE','TASE','Private']); renderTable(); }
function setStatus(v,b){ fStatus=v; setActive(b,['All','Has Jobs','No Jobs','Applied','In Progress']); renderTable(); }
function setSearch(v) { fQ=v; renderTable(); }

function setActive(btn, group) {
  document.querySelectorAll('.btn-filter').forEach(b => {
    if (group.includes(b.textContent.trim())) b.classList.remove('active');
  });
  btn.classList.add('active');
}

// ── ADD COMPANY MODAL ─────────────────────────────────────────────────────────
function openAddModal() { document.getElementById('modal-add').classList.remove('hidden'); }
function closeAddModal(){ document.getElementById('modal-add').classList.add('hidden'); }

function submitAddCompany() {
  const name    = document.getElementById('m-name').value.trim();
  if (!name) { showToast('Company name required', 'error'); return; }
  const newCo = {
    id:      'u_' + Date.now(),
    name,
    domain:  document.getElementById('m-domain').value.trim() || 'Tech',
    city:    document.getElementById('m-city').value,
    ex:      document.getElementById('m-ex').value,
    careers: document.getElementById('m-careers').value.trim() || '#',
  };
  companies.push(newCo);
  customCos.push(newCo);
  closeAddModal();
  ['m-name','m-domain','m-careers'].forEach(id => { const el=document.getElementById(id); if(el)el.value=''; });
  render();
  showToast('Company added!');
}

// ── EXPORT CSV ────────────────────────────────────────────────────────────────
function exportCSV() {
  const hdr = ['Company','Exchange','City','Domain','Careers','Role','Fit%','Date Applied','Status','Job URL','Notes'];
  const rows = [];
  companies.forEach(co => {
    const jobs = jobsData[co.id] || [];
    if (jobs.length === 0) {
      rows.push([co.name, co.ex, co.city, co.domain, co.careers, '', '', '', '', '', '']);
    } else {
      jobs.forEach(j => {
        const sl = STATUSES.find(s=>s.v===j.status)?.l || '';
        rows.push([co.name, co.ex, co.city, co.domain, co.careers,
                   j.role, j.fit||'', j.date||'',
                   sl.replace(/[^\w\s\-\/]/g,'').trim(),
                   j.url||'', j.notes||'']);
      });
    }
  });
  const csv  = [hdr, ...rows].map(r => r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = 'job_tracker_' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  showToast('CSV exported!');
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type='success') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className   = 'toast ' + type + ' show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ── JOB DESCRIPTION & INTERVIEW GUIDE ────────────────────────────────────────
let jdState = { coId: null, jobId: null, ai: 'claude', lang: 'en' };

function openJdModal(coId, jobId) {
  const job = (jobsData[coId]||[]).find(j => j.id === jobId);
  const co  = companies.find(c => c.id === coId);
  if (!job || !co) return;
  jdState.coId  = coId;
  jdState.jobId = jobId;
  document.getElementById('jd-subtitle').textContent = `${job.role || 'Role'} — ${co.name}`;
  document.getElementById('jd-text').value = job.jdesc || '';
  document.getElementById('jd-gen-hint').textContent = '';
  document.getElementById('jd-output').classList.add('hidden');
  document.getElementById('jd-placeholder').classList.remove('hidden');
  const savedKey = localStorage.getItem('openai_api_key') || '';
  if (savedKey) document.getElementById('jd-apikey').value = savedKey;
  setJdAI(jdState.ai);
  setJdLang(jdState.lang);
  document.getElementById('modal-jd').classList.remove('hidden');
  setTimeout(() => document.getElementById('jd-text').focus(), 60);
}

function closeJdModal() {
  const { coId, jobId } = jdState;
  if (coId && jobId) {
    const desc = document.getElementById('jd-text').value.trim();
    const job  = (jobsData[coId]||[]).find(j => j.id === jobId);
    if (job) {
      job.jdesc = desc;
      const btn = document.querySelector(`#job-${jobId} .btn-jd`);
      if (btn) btn.classList.toggle('has-jd', !!desc);
    }
  }
  document.getElementById('modal-jd').classList.add('hidden');
}

function setJdAI(ai) {
  jdState.ai = ai;
  document.getElementById('tog-claude').classList.toggle('active',  ai === 'claude');
  document.getElementById('tog-chatgpt').classList.toggle('active', ai === 'chatgpt');
  document.getElementById('jd-apikey-wrap').style.display = ai === 'chatgpt' ? 'flex' : 'none';
}

function setJdLang(lang) {
  jdState.lang = lang;
  document.getElementById('tog-en').classList.toggle('active', lang === 'en');
  document.getElementById('tog-he').classList.toggle('active', lang === 'he');
}

function saveApiKey() {
  const key = document.getElementById('jd-apikey').value.trim();
  if (key) { localStorage.setItem('openai_api_key', key); showToast('API key saved'); }
  else     { localStorage.removeItem('openai_api_key');   showToast('API key cleared'); }
}

function buildPrompt(role, company, jdesc, lang) {
  const langLine = lang === 'he'
    ? 'Write the ENTIRE response in Hebrew (עברית).'
    : 'Write the response in English.';
  return `You are an expert technical interview coach.\n\nCreate a comprehensive interview preparation guide for the following position.\n\n**Job Title:** ${role}\n**Company:** ${company}\n**Output Language:** ${langLine}\n\n**Job Description:**\n---\n${jdesc}\n---\n\nProvide a structured guide with these sections:\n\n## 1. 🎯 Role Overview & Key Requirements\nSummarise what the company is looking for and the core responsibilities.\n\n## 2. 🛠 Technical Topics & Skills to Prepare\nList specific technologies, frameworks, concepts, and tools mentioned or implied.\n\n## 3. ❓ Likely Interview Questions & Answer Frameworks\nProvide 10–15 probable questions with strong answer approaches.\n\n## 4. 💬 Behavioral / HR Questions\n5 relevant behavioral questions with STAR-method answer tips.\n\n## 5. 🤔 Smart Questions to Ask the Interviewer\n5–7 thoughtful questions that show genuine interest in the role.\n\n## 6. 💡 Preparation Tips & Final Advice\nSpecific, actionable tips tailored to this role and tech stack.\n\nMake the guide practical, specific, and actionable.`;
}

async function generateGuide() {
  const jdText = document.getElementById('jd-text').value.trim();
  if (!jdText) { showToast('Please paste a job description first', 'error'); return; }

  const { coId, jobId, ai, lang } = jdState;
  const job = (jobsData[coId]||[]).find(j => j.id === jobId);
  const co  = companies.find(c => c.id === coId);
  if (!job || !co) return;

  // Persist description immediately
  job.jdesc = jdText;
  const rowBtn = document.querySelector(`#job-${jobId} .btn-jd`);
  if (rowBtn) rowBtn.classList.add('has-jd');

  const prompt  = buildPrompt(job.role || 'Software Engineer', co.name, jdText, lang);
  const genBtn  = document.getElementById('jd-gen-btn');
  const hint    = document.getElementById('jd-gen-hint');
  const output  = document.getElementById('jd-output');
  const content = document.getElementById('jd-output-content');
  const pholder = document.getElementById('jd-placeholder');

  const apiKey = localStorage.getItem('openai_api_key') || document.getElementById('jd-apikey').value.trim();

  const showOutput = () => { pholder.classList.add('hidden'); output.classList.remove('hidden'); };

  // Claude — direct browser API calls are CORS-blocked; copy prompt + open claude.ai
  if (ai === 'claude') {
    showOutput();
    let copied = false;
    try { await navigator.clipboard.writeText(prompt); copied = true; } catch(e) {}
    window.open('https://claude.ai/new', '_blank', 'noopener');
    hint.textContent = copied ? '✅ Prompt copied to clipboard!' : '';
    content.innerHTML = renderClipboardNotice(prompt, copied, 'Claude');
    content.dir = 'ltr';
    return;
  }

  // ChatGPT without API key — copy + open chatgpt.com
  if (!apiKey) {
    showOutput();
    let copied = false;
    try { await navigator.clipboard.writeText(prompt); copied = true; } catch(e) {}
    window.open('https://chatgpt.com/', '_blank', 'noopener');
    hint.textContent = copied ? '✅ Prompt copied to clipboard!' : '';
    content.innerHTML = renderClipboardNotice(prompt, copied, 'ChatGPT');
    content.dir = 'ltr';
    return;
  }

  // ChatGPT with API key — inline generation via OpenAI API
  showOutput();
  genBtn.disabled = true;
  genBtn.innerHTML = '⏳ Generating…';
  content.innerHTML = `<div class="jd-loading"><div class="jd-loading-icon">⚡</div>Generating your interview guide…</div>`;
  content.dir = lang === 'he' ? 'rtl' : 'ltr';
  hint.textContent = '';

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3500,
        temperature: 0.7,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';
    content.innerHTML = formatGuide(text);
    hint.textContent = '✅ Guide generated!';
  } catch (err) {
    content.innerHTML = `<div class="jd-error">⚠️ ${esc(err.message)}<br><small>Check your API key or try without a key to open ChatGPT manually.</small></div>`;
    showToast('Generation failed — check API key', 'error');
  } finally {
    genBtn.disabled = false;
    genBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="width:14px;height:14px;flex-shrink:0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Generate Interview Guide`;
  }
}

function renderClipboardNotice(prompt, copied, aiName) {
  const safePrompt = prompt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `
    <div class="jd-clipboard-notice">
      <div class="jd-clipboard-title">${copied ? '✅ Prompt copied to clipboard!' : '📋 Ready to generate'}</div>
      <p style="color:var(--text2);margin-bottom:10px">${aiName} is opening in a new tab.</p>
      <ol class="jd-clipboard-steps">
        <li>Switch to the new <strong>${aiName}</strong> tab that just opened.</li>
        <li>${copied ? 'Paste the prompt (<kbd>Ctrl+V</kbd> / <kbd>⌘V</kbd>).' : `Copy the prompt below, then paste it into ${aiName}.`}</li>
        <li>Send the message to generate your interview guide.</li>
      </ol>
      <details class="jd-prompt-details">
        <summary>View prompt</summary>
        <pre class="jd-prompt-preview">${safePrompt}</pre>
      </details>
    </div>`;
}

function applyInline(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    .replace(/`([^`\n]+?)`/g, '<code>$1</code>');
}

function formatGuide(raw) {
  const escHtml = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const lines = raw.split('\n');
  const out   = [];
  const stack = []; // open list tags
  const closeList = () => { while (stack.length) out.push(`</${stack.pop()}>`); };

  for (const rawLine of lines) {
    const line = escHtml(rawLine);
    let m;
    if ((m = line.match(/^### (.+)/)))  { closeList(); out.push(`<h4>${applyInline(m[1])}</h4>`); continue; }
    if ((m = line.match(/^## (.+)/)))   { closeList(); out.push(`<h3>${applyInline(m[1])}</h3>`); continue; }
    if ((m = line.match(/^# (.+)/)))    { closeList(); out.push(`<h2>${applyInline(m[1])}</h2>`); continue; }
    if ((m = line.match(/^[-*•] (.+)/))) {
      if (!stack.length || stack.at(-1) !== 'ul') { closeList(); out.push('<ul>'); stack.push('ul'); }
      out.push(`<li>${applyInline(m[1])}</li>`); continue;
    }
    if ((m = line.match(/^\d+\. (.+)/))) {
      if (!stack.length || stack.at(-1) !== 'ol') { closeList(); out.push('<ol>'); stack.push('ol'); }
      out.push(`<li>${applyInline(m[1])}</li>`); continue;
    }
    if (line.trim() === '') { closeList(); continue; }
    closeList();
    out.push(`<p>${applyInline(line)}</p>`);
  }
  closeList();
  return out.join('\n');
}

function copyGuide() {
  const text = document.getElementById('jd-output-content').innerText;
  navigator.clipboard.writeText(text)
    .then(() => showToast('Guide copied to clipboard!'))
    .catch(() => showToast('Copy failed', 'error'));
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function esc(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }



// ── THEME ─────────────────────────────────────────────────────────────────────
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('idan_theme', theme);
  const sel = document.getElementById('theme-select');
  if (sel) sel.value = theme;
}

function initTheme() {
  const saved = localStorage.getItem('idan_theme') || 'navy';
  setTheme(saved);
}

// ── INIT ──────────────────────────────────────────────────────────────────────
initTheme();
loadData(); // async — fetches data.json first, falls back to localStorage
