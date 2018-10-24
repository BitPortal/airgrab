const domain = '//api.dapp.pub/';

export default (...args) => {
  args[0].replace(/^\//, '');
  args[0] = domain + args[0];
  return fetch(...args).then(res => res.json());
};

