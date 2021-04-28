// This is done to enable `yarn watch` to work, since Grafana uses SystemJS,
// which does not support loading ES modules (which the bundle gets created as
// in non-production mode).
// See https://git.io/JObnc for more information.
exports.getWebpackConfig = (base, _) => ({ ...base, ...{ mode: 'production' } });
