import axios from 'axios';

export const fetchAlarmsApi = (systemId) => (axios.get(`/system/alarm-list?sysid=${systemId}`));
