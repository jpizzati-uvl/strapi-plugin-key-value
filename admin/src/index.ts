import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import CustomFieldIcon from "./components/CustomFieldIcon";

export default {
  register(app: any) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    app.customFields.register({
      name: 'key-value',
      pluginId: 'key-value',
      type: 'json',
      icon: CustomFieldIcon,
      intlLabel: {
        id: 'key-value-label',
        defaultMessage: 'Key Value Pairs',
      },
      intlDescription: {
        id: 'key-value-description',
        defaultMessage: 'Key Value Pairs',
      },
      components: {
        Input: async () => import("./components/KeyValueMain"),
      },
      options: {},
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
