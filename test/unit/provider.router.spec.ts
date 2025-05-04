import { ProviderRouter } from '../../src/modules/provider/provider.router';
import { ChannelKey } from '../../src/shared/enums/channel-key.enum';

describe('ProviderRouter', () => {
  it('should dispatch using round-robin', async () => {
    const mock1 = {
      dispatch: jest.fn().mockResolvedValue({ id: '1', raw: {} }),
    };
    const mock2 = {
      dispatch: jest.fn().mockResolvedValue({ id: '2', raw: {} }),
    };

    const registry = new Map([[ChannelKey.SMS, [mock1, mock2]]]);
    const router = new ProviderRouter(registry);

    await router.dispatch(ChannelKey.SMS, {});
    await router.dispatch(ChannelKey.SMS, {});
    await router.dispatch(ChannelKey.SMS, {});

    expect(mock1.dispatch).toHaveBeenCalledTimes(2);
    expect(mock2.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should throw if no providers', async () => {
    const router = new ProviderRouter(new Map());
    await expect(router.dispatch(ChannelKey.EMAIL, {})).rejects.toThrow();
  });
});
