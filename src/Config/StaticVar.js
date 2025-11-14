// const URL_API = "https://akdaapi.lrtjakarta.co.id";
// const URL_API = "https://apiakda.teknologi40.com";
const URL_WEB = process.env.REACT_APP_URL_WEB; // "https://lrt.teknologi40.com";

// const URL_API = "http://localhost:2020";
const URL_API = process.env.REACT_APP_URL_API; // 'https://apilrt.teknologi40.com';
// const PING_TARGET = 'http://202.83.121.242'
const PING_TARGET = "https://apiakda.teknologi40.com";
// const MEDICAL_MICRO_APP = "https://medicalakda.teknologi40.com";
const MEDICAL_MICRO_APP = "http://localhost:3002";
// const ADMIN_MICRO_APP = "https://adminakda.teknologi40.com";
// const WORKORDER_MICRO_APP = "http://localhost:3001";
const WORKORDER_MICRO_APP =  process.env.REACT_APP_WORKORDER_MICRO_APP;// "https://workorderlrt.teknologi40.com";
// const ASSESSMENT_MICRO_APP = "https://assessmentakda.teknologi40.com";
const GOODS_MICRO_APP = process.env.REACT_APP_GOODS_MICRO_APP; // "https://goodslrt.teknologi40.com";
const OPERATIONAL_PELAYANAN_MICRO_APP = process.env.REACT_APP_OPERATIONAL_PELAYANAN_MICRO_APP; // "https://goodslrt.teknologi40.com";
const ASSESSMENT_MICRO_APP = "http://localhost:3003";
// const OPERATIONAL_MICRO_APP = "https://operationalakda.teknologi40.com";
const OPERATIONAL_MICRO_APP = "http://localhost:3004";
// const DASHBOARD_MICRO_APP = "https://dashboardakda.teknologi40.com";
const DASHBOARD_MICRO_APP = "http://localhost:3005";
// const INFORMATION_MICRO_APP = "https://informationakda.teknologi40.com";
const INFORMATION_MICRO_APP = "http://localhost:3007";
const REV = "1.0.0";

export default {
  URL_WEB,
  URL_API,
  PING_TARGET,
  MEDICAL_MICRO_APP,
  WORKORDER_MICRO_APP,
  GOODS_MICRO_APP,
  OPERATIONAL_PELAYANAN_MICRO_APP,
  ASSESSMENT_MICRO_APP,
  OPERATIONAL_MICRO_APP,
  DASHBOARD_MICRO_APP,
  INFORMATION_MICRO_APP,
  REV,
};
