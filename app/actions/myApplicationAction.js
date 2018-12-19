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
  const url = getAPIUrl('student');
  return (dispatch) => {
    axios.get(url)
      .then((response) => {
        dispatch({
          type: 'GRID_DATA',
          payload: response.data || response.message
        })
      }).catch((error) => {
        dispatch({
          type: 'GRID_DATA_ERROR',
          payload: error.data || error.message
        })
      })
  }
}