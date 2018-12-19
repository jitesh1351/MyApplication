const app_apis = {
  student: { port: 5056, relativePath: '/school/v1/students' }
};

const INT_BASE = "http://localhost";
/**
   * @desc getAPIBase, This function will create base URL
   * @return {string} apiBase url
   */
function getAPIBase() {

  return INT_BASE;
}
/**
   * @desc getAPIUrl, This function will create base URL
   * @param {string} api base url
   * @return {string} apiBase url
   */
export default function getAPIUrl(api) {
  const apiBase = getAPIBase();
  return apiBase + ':' + app_apis[api]['port'] + app_apis[api]['relativePath'];
}
