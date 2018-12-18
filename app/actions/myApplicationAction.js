'use strict';
export const GRID_DATA = 'GRID_DATA'
export const GRID_DATA_ERROR = 'GRID_DATA_ERROR'
import getAPIUrl from 'rootSource/apiConfig';
import axios from 'axios';
/**
 * @desc getGridData, To fetch grid Data
 * @returns {object} payload data
*/
export function getGridData() {
   const url = `http://localhost:5056/school/v1/students`;
   return (dispatch) => {
    axios.get(url)
    .then(function (response) {
      dispatch({
        type: 'GRID_DATA',
        payload: response.data || response.message
      })
    })
      /* axios({
      method:'get',
      url: url,
      success: function success(response) {
         const type = response.success ? GRID_DATA : GRID_DATA_ERROR;
         dispatch({
           type,
           payload: response.data || response.message
         })
       }
     }) */
   }
}
