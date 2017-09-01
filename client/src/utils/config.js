let config = null;

const _loadConfig = async () => {
  const configData = await fetch('/api/config');
  config = await configData.json();
  return config;
};

const _getConfig = () => {
  return config;
};

export const loadConfig = _loadConfig;
export const getConfig = _getConfig;
