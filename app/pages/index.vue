<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { siteMeta } from '~/site'
import Stats from '~/components/Stats/Stats.vue'
import Stat from '~/components/Stats/Stat.vue'
import Features from '~/components/Features/Features.vue'
import Feature from '~/components/Features/Feature.vue'
import Terminal from '~/components/Home/Terminal.vue'
import DownloadApp from '~/components/Home/DownloadApp.vue'
import MobilePhone from '~/components/Home/MobilePhone.vue'

const { te, t } = useI18n()
const markdownT = useMarkdownT()
usePageHead()

const features = computed(() => {
  const result = []
  for (let i = 1; te(`index.main.features.${i}`); i++) {
    result.push(markdownT(`index.main.features.${i}`))
  }
  return result
})
</script>

<template>
  <div>
    <header class="pt-2 pt-md-5 pb-5">
      <container>
        <b-container fluid>
          <b-row>
            <b-col
              sm="12"
              md="7"
              class="d-flex align-items-center position-relative"
            >
              <blurred-stain class="z-0" />
              <div class="z-1 position-relative text-md-start mb-5 mb-md-0">
                <title-with-subtitle level="1">
                  <template #before>
                    <client-only>
                      <pill
                        class="fade-up-1"
                        pulse
                      >
                        <app-version>
                          <template #suffix>
                            — {{ t('index.main.title.pill') }}
                          </template>
                        </app-version>
                      </pill>
                    </client-only>
                  </template>
                  <span
                    class="fade-up-2"
                    v-html="markdownT('index.main.title.content')"
                  />
                  <template #description>
                    <ul class="fade-up-3 list-unstyled mb-5">
                      <li
                        v-for="(feature, index) in features"
                        :key="`feature-${index}`"
                      >
                        <icon
                          name="heroicons:check"
                          class="me-2 text-primary"
                        />
                        <span v-html="feature" />
                      </li>
                    </ul>
                  </template>
                </title-with-subtitle>
                <div>
                  <div class="fade-up-4">
                    <b-button
                      variant="primary"
                      to="/#download"
                    >
                      <icon
                        name="heroicons:arrow-down-tray"
                        class="h-6 w-6"
                      /> {{ t('index.main.buttons.download') }}
                    </b-button>
                    <b-button
                      variant="link"
                      to="/#open-source"
                    >
                      {{ t('index.main.buttons.sourceCode') }}
                      →
                    </b-button>
                  </div>
                  <div class="latest-version fade-up-5 font-monospace text-muted">
                    <client-only>
                      <app-version class="text-primary">
                        <template #prefix>
                          <span
                            class="text-muted"
                            v-text="t('index.main.latestVersion.text')"
                          />
                        </template>
                      </app-version> ·
                    </client-only>
                    <a
                      :href="`${siteMeta.github}/blob/main/CHANGELOG.md`"
                      v-text="t('index.main.latestVersion.changelog')"
                    />.
                  </div>
                </div>
              </div>
            </b-col>
            <b-col
              sm="12"
              md="5"
              class="position-relative"
            >
              <mobile-phone class="fade-up-6">
                <img
                  class="mw-100"
                  src="/images/screenshots/home.png"
                  alt="Screenshot"
                >
              </mobile-phone>
            </b-col>
          </b-row>
        </b-container>
      </container>
    </header>
    <container
      vertical-padding="2"
      alternate
    >
      <stats>
        <stat
          stat="100%"
          :title="t('index.stats.1')"
        />
        <stat
          stat="0"
          :title="t('index.stats.2')"
        />
        <stat
          stat="5"
          :title="t('index.stats.3')"
        />
        <stat
          stat="GPL v3"
          :title="t('index.stats.4')"
        />
      </stats>
    </container>
    <container>
      <div class="pt-5 pb-2">
        <title-with-subtitle>
          <template #before>
            {{ t('index.features.title.before') }}
          </template>
          <span v-html="markdownT('index.features.title.content')" />
          <template #description>
            <p class="mb-5">
              {{ t('index.features.description') }}
            </p>
          </template>
        </title-with-subtitle>
      </div>
      <Features>
        <feature
          emoji="🔐"
          :title="t('index.features.1.title')"
          :description="markdownT('index.features.1.description')"
        />
        <feature
          emoji="☁️"
          :title="t('index.features.2.title')"
          :description="markdownT('index.features.2.description')"
        />
        <feature
          emoji="🛡️"
          :title="t('index.features.3.title')"
          :description="markdownT('index.features.3.description')"
        />
        <feature
          emoji="📱"
          :title="t('index.features.4.title')"
          :description="markdownT('index.features.4.description')"
        />
        <feature
          emoji="🌍"
          :title="t('index.features.5.title')"
          :description="markdownT('index.features.5.description')"
        />
        <feature
          emoji="⚡"
          :title="t('index.features.6.title')"
          :description="markdownT('index.features.6.description')"
        />
      </Features>
    </container>
    <container alternate>
      <download-app :download-button="t('index.download.button')">
        <div class="pb-2">
          <title-with-subtitle>
            <template #before>
              {{ t('index.download.title.before') }}
            </template>
            <span
              id="download"
              v-html="markdownT('index.download.title.content')"
            />
            <template #description>
              <p class="mb-5">
                {{ t('index.download.description') }}
              </p>
            </template>
          </title-with-subtitle>
        </div>
      </download-app>
    </container>
    <container fluid>
      <b-row>
        <b-col
          sm="12"
          lg="6"
          class="d-flex flex-column justify-content-center"
        >
          <div>
            <title-with-subtitle>
              <template #before>
                {{ t('index.openSource.title.before') }}
              </template>
              <span
                id="open-source"
                v-html="markdownT('index.openSource.title.content')"
              />
              <template #description>
                <p class="mb-4">
                  {{ t('index.openSource.description.1') }}
                </p>
                <p class="mb-5">
                  {{ t('index.openSource.description.2') }}
                </p>
              </template>
            </title-with-subtitle>
            <div class="d-flex flex-column flex-sm-row align-items-stretch gap-2">
              <b-button
                variant="primary"
                :href="siteMeta.github"
              >
                <icon name="bi:github" /> {{ t('index.openSource.linkButtons.github') }}
              </b-button>
              <b-button
                variant="secondary"
                href="https://paypal.me/Skyost"
              >
                ☕ {{ t('index.openSource.linkButtons.donate') }}
              </b-button>
              <b-button
                variant="secondary"
                to="/translate/"
              >
                🌐 {{ t('index.openSource.linkButtons.translate') }}
              </b-button>
            </div>
          </div>
        </b-col>
        <b-col
          sm="12"
          lg="6"
        >
          <terminal class="mt-5 mt-lg-0" />
        </b-col>
      </b-row>
    </container>
    <container
      :offset-lg="3"
      class="text-center position-relative"
      alternate
    >
      <blurred-stain class="z-0" />
      <div class="position-relative z-1">
        <title-with-subtitle>
          <template #before>
            {{ t('index.getStarted.title.before') }}
          </template>
          <span v-html="markdownT('index.getStarted.title.content')" />
          <template #description>
            <p class="mb-5">
              {{ t('index.getStarted.description') }}
            </p>
          </template>
        </title-with-subtitle>
        <b-button
          variant="primary"
          to="/#download"
        >
          <icon
            name="heroicons:arrow-down-tray"
            class="h-6 w-6"
          /> {{ t('index.getStarted.buttons.download') }}
        </b-button>
        <b-button
          variant="link"
          to="/#open-source"
        >
          {{ t('index.getStarted.buttons.contribute') }}
          →
        </b-button>
      </div>
    </container>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/colors';

.os-window {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 250px;

  .os-logo {
    max-width: 20%;
  }
}

.latest-version {
  text-align: left;
  margin-top: 10px;
  font-size: 0.7rem;
}
</style>
