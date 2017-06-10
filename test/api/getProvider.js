import assert from 'assert';
import config from 'config';
import CouchPotato from 'couchpotato-api';
import SickBeard from 'node-sickbeard';
import sinon from 'sinon';

import getProvider, {PROVIDER_TYPE} from '~/api/getProvider.js';

describe('api.getProvider', () => {
  let getConfig, sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    getConfig = sandbox.stub(config, 'get');

    getConfig.withArgs('alexa-libby').returns({
      server: {
        hostname: 'http://localhost'
      },
      movies: {
        provider: 'couchpotato',
        server: {
          port: 9090,
          apiKey: 'abcdefghijklmnopqrstuvwxyz123456'
        }
      },
      shows: {
        provider: 'sickbeard',
        server: {
          port: 7070,
          apiKey: 'abcdefghijklmnopqrstuvwxyz123456'
        }
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should get a Couch Potato API instance', () => {
    getConfig.withArgs('alexa-libby.movies.provider').returns('couchpotato');

    assert(getProvider(PROVIDER_TYPE.MOVIES).default instanceof CouchPotato);
  });

  it('should get a Sickbeard API instance', () => {
    getConfig.withArgs('alexa-libby.shows.provider').returns('sickbeard');

    assert(getProvider(PROVIDER_TYPE.SHOWS).default instanceof SickBeard);
  });
});
