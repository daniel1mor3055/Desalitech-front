import axios from 'axios';

export const fetchTagsApi = (systemId) => (axios.get(`/system/tag-list?sysid=${systemId}`));